import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: Model,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = { username: 'testuser', email: 'test@example.com', password: 'password123' };
      const createdUser = { ...createUserDto, _id: 'some-id' };
      jest.spyOn(service, 'create').mockResolvedValue(createdUser as any);
      expect(await controller.create(createUserDto)).toEqual(createdUser);
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const userId = 'some-id';
      const updateUserDto: UpdateUserDto = { username: 'updateduser', email: 'updated@example.com', password: 'updatedpassword' };
      const updatedUser = { ...updateUserDto, _id: userId };

      jest.spyOn(service, 'update').mockResolvedValue(updatedUser as any);

      expect(await controller.update(userId, updateUserDto)).toEqual(updatedUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        { _id: 'user1', username: 'user1', email: 'user1@example.com', password: 'pass1' },
        { _id: 'user2', username: 'user2', email: 'user2@example.com', password: 'pass2' },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(users as any);

      expect(await controller.findAll()).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const userId = 'some-id';
      const user = { _id: userId, username: 'founduser', email: 'found@example.com', password: 'foundpassword' };

      jest.spyOn(service, 'findOne').mockResolvedValue(user as any);

      expect(await controller.findOne(userId)).toEqual(user);
    });
  });

  describe('delete', () => {
    it('should delete a user by ID', async () => {
      const userId = 'some-id';
      const deletedUser = { _id: userId, username: 'deleteduser', email: 'deleted@example.com', password: 'deletedpassword' };

      jest.spyOn(service, 'delete').mockResolvedValue(deletedUser as any);

      expect(await controller.delete(userId)).toEqual(deletedUser);
    });
  });
});