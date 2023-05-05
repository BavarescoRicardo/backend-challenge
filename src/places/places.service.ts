import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from './entities/place.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
  ) {}

  async create(createPlaceDto: CreatePlaceDto): Promise<CreatePlaceDto | null> {
    try {
      const { local, country } = createPlaceDto;
      if (!(await this.validateSameCountryAndLocal(local, country))) {
        throw new Error('Cannot post duplicated country and place');
      }
      const newPlace = {
        ...createPlaceDto,
        id: Date.now(),
        createDate: new Date(),
        updateDate: new Date(),
      };

      return this.placeRepository.save(newPlace);
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updatePlaceDto: UpdatePlaceDto,
  ): Promise<UpdatePlaceDto | null> {
    try {
      const place = await this.placeRepository.findOneBy({ id: id });
      if (!place) throw new Error('Could not find this place');

      await this.placeRepository.update(place, updatePlaceDto);
      return updatePlaceDto;
    } catch (error) {
      throw error;
    }
  }

  findAll(): Promise<Place[]> {
    return this.placeRepository.find({
      order: {
        meta: 'ASC',
      },
    });
  }

  findOne(id: number): Promise<Place | null> {
    try {
      return this.placeRepository.findOneBy({ id: id });
    } catch (error) {
      throw error;
    }
  }

  async validateSameCountryAndLocal(
    local: string,
    country: string,
  ): Promise<boolean> {
    let duplicated: Promise<Place[]>;
    try {
      duplicated = this.placeRepository.findBy({
        local: local,
        country: country,
      });
    } catch (error) {}

    return (await duplicated).length === 0;
  }

  async remove(id: number): Promise<void> {
    await this.placeRepository.delete(id);
  }
}
