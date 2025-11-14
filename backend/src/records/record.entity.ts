import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column()
  lastName: string;

  @Column()
  location: string;

  @Column()
  phone: string;

  // 🧹 Automatically trim spaces before saving or updating
  @BeforeInsert()
  @BeforeUpdate()
  trimFields() {
    this.firstName = this.firstName?.trim() || '';
    this.middleName = this.middleName?.trim() || '';
    this.lastName = this.lastName?.trim() || '';
    this.location = this.location?.trim() || '';
    this.phone = this.phone?.trim() || '';
  }
}
