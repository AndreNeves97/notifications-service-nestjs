export abstract class BaseUsecase<Req, Res> {
  abstract execute(request: Req): Res | Promise<Res>;
}
