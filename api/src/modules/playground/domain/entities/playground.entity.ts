export class Problem {
  constructor(
    public problemId: string,
    public languageId: string,
    public sourceCode: string,
    public stdin: string,
  ) {}
}
