import { Controller, Post, Body, ValidationPipe, Put, Get, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    async create(@Body(new ValidationPipe()) createUser: CreateUserDto) {
        return this.userService.create(createUser);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body(new ValidationPipe()) updateUser: UpdateUserDto) {
        return this.userService.update(id, updateUser);
    }

    @Get()
    async findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.userService.delete(id);
    }
}
