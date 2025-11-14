import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordsModule } from './records/records.module';
import { Record } from './records/record.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Ramasridevi@21',      // your MySQL password
      database: 'ashramam_db',
      entities: [Record],
      synchronize: true,
    }),

    RecordsModule,
  ],
})
export class AppModule {}
