import { CodePlaygroundResponseDto } from '../../application/dto/code-playground-response';

export const USER_REPOSITORY = Symbol('PLAYGROUND_REPOSITORY');

export interface PlaygroundRepository {
  submit(dto: CodePlaygroundResponseDto);
}
