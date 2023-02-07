import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Board, BoardSchema } from './schemas/board.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ColumnOfBoard, ColumnOfBoardSchema } from './schemas/column.schema';
import { Project, ProjectSchema } from './schemas/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]),
    MongooseModule.forFeature([
      { name: ColumnOfBoard.name, schema: ColumnOfBoardSchema },
    ]),
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
