import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';
import { ProjectService } from './project.service';

@Controller('projects')
@ApiTags('Project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  createProject(@Body() createDTO: CreateProjectDTO) {
    return this.projectService.create(createDTO);
  }

  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    example: '63228d323fce64cc20df1915',
  })
  @Put(':id')
  updateProject(@Body() updateDTO: UpdateProjectDTO) {
    return this.projectService.update(updateDTO);
  }

  @Delete(':id')
  removeProject() {
    return '';
  }

  @Post('columns')
  createColumn() {
    return '';
  }

  @ApiParam({
    name: 'id',
    required: true,
    example: '63228d323fce64cc20df1915',
  })
  @Put('columns/:id')
  updateColumn() {
    return '';
  }

  @Delete()
  removeColumn() {
    return '';
  }
}
