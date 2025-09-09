export class IApiResponse<T> {
  constructor(
    public readonly result: T,
    public readonly message?: string,
    public readonly success: boolean = true,
  ) {}
}
