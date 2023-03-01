import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDTO {
  @ApiProperty({ description: 'Project name' })
  name: string;

  @ApiProperty({ description: 'Project description' })
  description: string;

  @ApiProperty({ description: 'List id of users' })
  member: [string];

  @ApiProperty({ description: 'Image of project' })
  imageuUrl: string;
}
