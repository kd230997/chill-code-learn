export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public password: string,
    public name: string | null,
    public createdAt: Date,
    public updatedAt: Date,
    public isActive: boolean,
  ) {}
}
