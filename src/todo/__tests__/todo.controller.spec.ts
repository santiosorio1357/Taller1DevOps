import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Todo } from "../schemas/todo.schema";
import { TodoController } from "../todo.controller";
import { TodoModule } from "../todo.module";
import { TodoService } from "../todo.service";

describe('TodoController', () => {
  let controller: TodoController; 
  let todoService: TodoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TodoModule],
    })
    .overrideProvider(getModelToken(Todo.name))
    .useValue(jest.fn())
    .compile();

    controller = module.get<TodoController>(TodoController); 
    todoService = module.get<TodoService>(TodoService); 
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
});