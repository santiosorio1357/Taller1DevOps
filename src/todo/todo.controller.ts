import { Controller, Post, Body  } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService){}

    @Post('create')
    async create(@Body() createTodo: any){
        return this.todoService.create(createTodo)
    }
}
