import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { Tags, TagsSchema } from './tags.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tags.name, schema: TagsSchema }])],
  providers: [TagsService],
  controllers: [TagsController],
  exports: [TagsService],
})
export class TagsModule {}