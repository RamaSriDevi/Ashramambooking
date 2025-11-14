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

  create(data: Record) {
    const record = this.recordRepo.create(data);
    return this.recordRepo.save(record);
  }

  findAll() {
    return this.recordRepo.find();
  }

  findOne(id: number) {
    return this.recordRepo.findOne({ where: { id } });
  }

  update(id: number, data: Partial<Record>) {
    return this.recordRepo.update(id, data);
  }

  remove(id: number) {
    return this.recordRepo.delete(id);
  }
}
