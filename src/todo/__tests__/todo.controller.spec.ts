import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from '../todo.controller';
import { TodoService } from '../todo.service';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { UpdateTodoDto } from '../dtos/update-todo.dto';
import { Todo, TodoStatus } from '../schemas/todo.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        TodoService,
        {
          provide: getModelToken(Todo.name),
          useValue: Model,
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const createTodoDto: CreateTodoDto = { title: 'New Todo', description: 'Description', status: TodoStatus.PENDING };
      const createdTodo = { ...createTodoDto, _id: 'some-id' };
      jest.spyOn(service, 'create').mockResolvedValue(createdTodo as any);
      expect(await controller.create(createTodoDto)).toEqual({});
    });
  });

  describe('update', () => {
    it('should update an existing todo', async () => {
      const todoId = 'some-id';
      const updateTodoDto: UpdateTodoDto = { title: 'Updated Todo', description: 'Updated Description', status: TodoStatus.IN_PROGRESS };
      const updatedTodo = { ...updateTodoDto, _id: todoId };

      jest.spyOn(service, 'update').mockResolvedValue(updatedTodo as any);

      expect(await controller.update(todoId, updateTodoDto)).toEqual(updatedTodo);
    });
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const todos = [
        { _id: 'todo1', title: 'Todo 1', description: 'Description 1', status: 'PENDING' },
        { _id: 'todo2', title: 'Todo 2', description: 'Description 2', status: 'COMPLETED' },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(todos as any);

      expect(await controller.findAll()).toEqual(todos);
    });
  });

  describe('findOne', () => {
    it('should return a todo by ID', async () => {
      const todoId = 'some-id';
      const todo = { _id: todoId, title: 'Found Todo', description: 'Found Description', status: 'IN_PROGRESS' };

      jest.spyOn(service, 'findOne').mockResolvedValue(todo as any);

      expect(await controller.findOne(todoId)).toEqual(todo);
    });
  });

  describe('delete', () => {
    it('should delete a todo by ID', async () => {
      const todoId = 'some-id';
      const deletedTodo = { _id: todoId, title: 'Deleted Todo', description: 'Deleted Description', status: 'COMPLETED' };

      jest.spyOn(service, 'delete').mockResolvedValue(deletedTodo as any);

      expect(await controller.delete(todoId)).toEqual(deletedTodo);
    });
  });
});
