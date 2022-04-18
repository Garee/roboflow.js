import { Response } from "node-fetch";

export class RoboflowClientHttpError extends Error {
  public res: Response;

  constructor(res: Response) {
    super(
      `Roboflow encountered a HTTP error: Status ${res.status}\n${res.text}`
    );
    this.name = RoboflowClientHttpError.name;
    this.res = res;
  }
}
