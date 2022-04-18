import fetch, { Response } from "node-fetch";
import { RoboflowClientHttpError } from "./http";
import {
  ProjectResponseBody,
  RootResponseBody,
  WorkspaceResponseBody,
} from "./response-bodies";

export interface RoboflowClientSettings {
  debug?: boolean;
}

export class RoboflowClient {
  private static baseUrl = "https://api.roboflow.com/";

  private apiKey: string;
  private debug: boolean;

  constructor(
    apiKey: string,
    settings: RoboflowClientSettings = { debug: false }
  ) {
    this.apiKey = apiKey;
    this.debug = !!settings.debug;
  }

  public async root(): Promise<RootResponseBody> {
    const url = this.buildUrl();
    this.log(`Sending request: GET ${url}`);

    const res = await this.req(url);
    const body: RootResponseBody = await res.json();
    return body;
  }

  public async workspace(workspace: string): Promise<WorkspaceResponseBody> {
    const url = this.buildUrl(workspace);
    this.log(`Sending request: GET ${url}`);

    const res = await this.req(url);
    const body: WorkspaceResponseBody = await res.json();
    return body;
  }

  public async project(
    workspace: string,
    project: string
  ): Promise<ProjectResponseBody> {
    const url = this.buildUrl(`${workspace}/${project}`);
    this.log(`Sending request: GET ${url}`);

    const res = await this.req(url);
    const body: ProjectResponseBody = await res.json();
    return body;
  }

  private buildUrl(path = ""): string {
    return `${RoboflowClient.baseUrl}${path}?api_key=${this.apiKey}`;
  }

  private async req(url: string): Promise<Response> {
    const res = await fetch(url);
    this.log(`Response status code: ${res.status} body: ${res.text}`);

    if (!res.ok) {
      throw new RoboflowClientHttpError(res);
    }

    return res;
  }

  private log(msg: string): void {
    this.debug && console.debug(msg);
  }
}
