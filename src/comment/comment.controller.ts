import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';

@Controller('comment')
@ApiTags('Comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDTO: CreateCommentDTO) {
    return createCommentDTO;
  }

  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    example: '63228d323fce64cc20df1915',
  })
  @Put(':id')
  update(@Body() updateCommentDTO: UpdateCommentDTO) {
    return updateCommentDTO;
  }

  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    example: '63228d323fce64cc20df1915',
  })
  @Delete(':id')
  delete() {
    return true;
  }
}
