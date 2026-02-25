import { Problem } from '../../domain/entities/playground.entity';
import { CodePlaygroundResponseDto } from '../dto/code-playground-response';

export class UserMapper {
  static toResponse(problem: Problem): CodePlaygroundResponseDto {
    return {
      result: problem.sourceCode,
      language: problem.languageId,
    };
  }

  static toResponseList(users: Problem[]): CodePlaygroundResponseDto[] {
    return users.map((item: Problem) => this.toResponse(item));
  }
}
