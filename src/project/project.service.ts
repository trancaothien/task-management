import { Injectable } from '@nestjs/common';
import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  async create(projectDTO: CreateProjectDTO) {
    return projectDTO;
  }

  async update(updateDTO: UpdateProjectDTO) {
    return updateDTO;
  }
}
