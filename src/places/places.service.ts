import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        throw new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Local deste país não pode ser adicionado novamente',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
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
      const { local, meta } = updatePlaceDto;

      const place = await this.placeRepository.findOne({ where: { id: id } });
      if (!place) {
        throw new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Não foi possível encontrar este lugar',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      place.local = local;
      place.meta = meta;
      place.updateDate = new Date();

      await this.placeRepository.update(id, place);
      return updatePlaceDto;
    } catch (error) {
      throw error;
    }
  }

  findAll(): Promise<Place[] | null> {
    return this.placeRepository.find({
      order: {
        meta: 'ASC',
      },
    });
  }

  findOne(id: number): Promise<Place | null> {
    try {
      return this.placeRepository.findOne({ where: { id: id } });
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
      duplicated = this.placeRepository.find({
        where: {
          local: local,
          country: country,
        },
      });
    } catch (error) {}

    return (await duplicated)?.length === 0;
  }

  async remove(id: number): Promise<string> {
    try {
      const place = await this.placeRepository.findOne({ where: { id: id } });
      if (!place) {
        throw new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Não foi possível encontrar este lugar',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      await this.placeRepository.delete(place);
      return `Removido lugar ${id}`;
    } catch (error) {
      throw error;
    }
  }
}
