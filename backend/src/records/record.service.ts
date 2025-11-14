import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from './record.entity';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private recordRepo: Repository<Record>,
  ) {}

  async create(data: Record) {
    // 🧹 Trim whitespace from all text fields before saving
    const trimmedData: Partial<Record> = {
      ...data,
      firstName: data.firstName?.trim() || '',
      middleName: data.middleName?.trim() || '',
      lastName: data.lastName?.trim() || '',
      location: data.location?.trim() || '',
      phone: data.phone?.trim() || '',
    };

    const record = this.recordRepo.create(trimmedData);
    return await this.recordRepo.save(record);
  }

  async findAll() {
    return await this.recordRepo.find();
  }

  async findOne(id: number) {
    return await this.recordRepo.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<Record>) {
    const trimmedData: Partial<Record> = {
      ...data,
      firstName: data.firstName?.trim() || '',
      middleName: data.middleName?.trim() || '',
      lastName: data.lastName?.trim() || '',
      location: data.location?.trim() || '',
      phone: data.phone?.trim() || '',
    };
    await this.recordRepo.update(id, trimmedData);
    return this.findOne(id);
  }

  async remove(id: number) {
    return await this.recordRepo.delete(id);
  }
}
