import { Module } from '@nestjs/common';
import { TodosService } from './todo.service';

@Module({
  providers: [TodosService]
})
export class TodosModule {}
