import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller'; 
import { UserService } from '../user.service'; 
import { getModelToken } from '@nestjs/mongoose';
import { CreateUserDto } from '../dtos/create-user.dto'; 
import { UpdateUserDto } from '../dtos/update-user.dto'; 
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

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
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
