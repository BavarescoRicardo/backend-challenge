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

  async create(createPlaceDto: CreatePlaceDto) {
    try {
      const newPlace = {
        ...createPlaceDto,
        id: Date.now(),
        createDate: new Date(),
        updateDate: new Date(),
      };
      console.log('tentativa de criar novo');
      console.log(newPlace);
      return this.placeRepository.save(newPlace);
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updatePlaceDto: UpdatePlaceDto) {
    return `This action updates a #${id} place`;
  }

  findAll(): Promise<Place[]> {
    return this.placeRepository.find();
  }

  findOne(id: number): Promise<Place | null> {
    return this.placeRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<void> {
    await this.placeRepository.delete(id);
  }
}
