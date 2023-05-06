import { Test, TestingModule } from '@nestjs/testing';
import { PlacesService } from './places.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('PlacesService', () => {
  let service: PlacesService;
  let repositoryMock;
  let placeRepository: Repository<Place>;

  beforeEach(async () => {
    repositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlacesService,
        {
          provide: getRepositoryToken(Place),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<PlacesService>(PlacesService);
    placeRepository = module.get<Repository<Place>>(getRepositoryToken(Place));
  });

  describe('findAll', () => {
    it('should return all places', async () => {
      const places = [
        {
          id: 1,
          country: 'Pais x',
          local: 'local x',
          meta: '2030-10',
          flagUrl: 'https://flags',
          createDate: new Date(),
          updateDate: new Date(),
        },
        {
          id: 2,
          country: 'Pais y',
          local: 'Pais y',
          meta: '2031-10',
          flagUrl: 'https://flags',
          createDate: new Date(),
          updateDate: new Date(),
        },
      ];
      repositoryMock.find.mockReturnValue(places);
      const result = await service.findAll();

      expect(result).toEqual(places);
      expect(repositoryMock.find).toHaveBeenCalledTimes(1);
      expect(repositoryMock.find).toHaveBeenCalledWith({
        order: { meta: 'ASC' },
      });
    });

    describe('findOne', () => {
      it('should return a place', async () => {
        const place = {
          id: 1,
          country: 'Pais x',
          local: 'local x',
          meta: '2030-10',
          flagUrl: 'https://flags',
          createDate: new Date(),
          updateDate: new Date(),
        };
        await repositoryMock.findOne.mockReturnValue(place);

        const result = await service.findOne(1);
        expect(result).toEqual(place);
        expect(repositoryMock.findOne).toHaveBeenCalledTimes(1);
      });
    });

    describe('create', () => {
      it('should call create on place service', async () => {
        const createPlaceDto: CreatePlaceDto = {
          country: 'Pais x',
          local: 'local x',
          meta: new Date(),
          flagUrl: 'https://bandeirabrasil.com/img1',
        };

        jest.spyOn(placeRepository, 'findOne').mockReturnValue(null);
        await service.create(createPlaceDto);
        expect(placeRepository.save).toBeCalled();
      });
    });

    describe('update', () => {
      const mockId = 1;
      const mockUpdatePlaceDto: UpdatePlaceDto = {
        local: 'Outro local',
        meta: new Date(),
      };

      it('should throw a not found exception', async () => {
        jest.spyOn(placeRepository, 'findOne').mockResolvedValue(null);

        await expect(
          service.update(mockId, mockUpdatePlaceDto),
        ).rejects.toThrow(
          new HttpException(
            'Não foi possível encontrar este lugar',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      });
    });

    describe('delete', () => {
      const mockId = 1;
      const mockPlace: Place = {
        id: mockId,
        country: 'Place 1',
        local: 'Place 1',
        meta: new Date('2024-01-01'),
        flagUrl: 'https://bandeirabrasil.com/img1',
        createDate: new Date(),
        updateDate: new Date(),
      };

      it('should delete a place', async () => {
        jest.spyOn(placeRepository, 'findOne').mockResolvedValue(mockPlace);
        jest
          .spyOn(placeRepository, 'delete')
          .mockResolvedValue({} as DeleteResult);

        const result = await service.remove(mockId);

        expect(result).toEqual('Removido lugar 1');
        expect(placeRepository.findOne).toHaveBeenCalledWith({
          where: { id: mockId },
        });
        expect(placeRepository.delete).toHaveBeenCalledWith(mockPlace);
      });

      it('should throw an exception', async () => {
        jest.spyOn(placeRepository, 'findOne').mockResolvedValue(null);

        await expect(service.remove(mockId)).rejects.toThrow(
          new HttpException(
            {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Não foi possível encontrar este lugar',
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      });
    });
  });
});
