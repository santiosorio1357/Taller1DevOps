import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Todo } from './schemas/todo.schema';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';

@Injectable()
export class TodoService {
    constructor(@InjectModel(Todo.name) private todoModeL: Model<Todo>) { }

    async create(todo: CreateTodoDto) {
        const createdTodoo = new this.todoModeL(todo)
        return createdTodoo.save()
    }

    async update(id: string, todo: UpdateTodoDto) {
        return this.todoModeL.findByIdAndUpdate(id, todo, {
            new: true,
        }).exec()
    }

    async findAll(){
        return this.todoModeL.find().exec()
    }

    async findOne(id: string){
        return this.todoModeL.findById(id).exec()
    }

    async delete(id: string){
        return this.todoModeL.findByIdAndDelete(id).exec()
    }
}
