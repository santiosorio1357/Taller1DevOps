import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Todo } from './schemas/todo.schema';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
    constructor(@InjectModel(Todo.name) private todoModeL: Model<Todo>) {}

    async create(todo: any){
        const createdTodoo = new this.todoModeL(todo)
        return createdTodoo.save()
    }
}
