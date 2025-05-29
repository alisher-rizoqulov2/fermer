import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./scheam/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { email, password, confrim_password } = createUserDto;
    if (password !== confrim_password) {
      console.log(password);
      console.log(confrim_password);
      throw new BadRequestException("Parollar mos emas");
    }
    const existingAdmin = await this.userRepo.findOne({ where: { email } });
    if (existingAdmin) {
      throw new BadRequestException("Bunday emailli foydalanuvchi mavjud");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newUser = this.userRepo.create({
      ...createUserDto,
      password: hashed_password,
    });
    return await this.userRepo.save(newUser);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }
  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      if (updateUserDto.password !== updateUserDto.confrim_password) {
        throw new BadRequestException("Parollar mos emas");
      }
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 7);
      delete updateUserDto.confrim_password;
    }
    return this.userRepo.update(id, updateUserDto);
  }
  remove(id: number) {
    return this.userRepo.delete(id);
  }
}
