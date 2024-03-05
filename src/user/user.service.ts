import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async create(user: CreateUserDto) {
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }

    async update(id: string, user: UpdateUserDto) {
        return this.userModel.findByIdAndUpdate(id, user, {
            new: true,
        }).exec();
    }

    async findAll() {
        return this.userModel.find().exec();
    }

    async findOne(id: string) {
        return this.userModel.findById(id).exec();
    }

    async delete(id: string) {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}
