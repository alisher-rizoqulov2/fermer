import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepo: Repository<Inventory>
  ) {}

 async create(createInventoryDto: CreateInventoryDto) {
  const Inventory = await this.inventoryRepo.create(createInventoryDto);
  return this.inventoryRepo.save(Inventory);
  }

  findAll() {
    return this.inventoryRepo.find()
  }

  findOne(id: number) {
    return this.inventoryRepo.findOneBy({id})
  }

  async update(id: number, updateInventoryDto: UpdateInventoryDto) {
    const inven = await this.inventoryRepo.findOneBy({ id });
    if(!inven){
      throw new NotFoundException("Bunaqa iDli Invent yoq")
    }
    await this.inventoryRepo.update(id, updateInventoryDto);
    return this.inventoryRepo.findOneBy({ id });
  }

  async remove(id: number) {
    const remove = await this.inventoryRepo.findOneBy({ id });
    if (!remove) {
      throw new NotFoundException("Bunaqa Idli inventory topilmadi");
    }
    await this.inventoryRepo.delete(id);

    return { message: `Cattle with id ${id} has been removed` };
  }
}
