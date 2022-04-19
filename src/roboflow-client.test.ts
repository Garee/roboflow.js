import { RoboflowClient } from "./roboflow-client";
import { config } from "dotenv";
import { RoboflowClientHttpError } from "./http";

let roboflow: RoboflowClient;

beforeAll(() => {
  config();

  const apiKey = process.env.ROBOFLOW_API_KEY ?? "";

  roboflow = new RoboflowClient(apiKey, {
    debug: process.env.DEBUG === "true",
  });
});

test("test get root", async () => {
  const body = await roboflow.root();
  expect(body.welcome).toBe("Welcome to the Roboflow API.");
  expect(body.instructions).toBe("You are successfully authenticated.");
  expect(body.docs).toBe("https://docs.roboflow.com");
  expect(typeof body.workspace).toBe("string");
});

test("test get root (unauthenticated)", async () => {
  const roboflow = new RoboflowClient("", {
    debug: process.env.DEBUG === "true",
  });
  const body = await roboflow.root();
  expect(body.welcome).toBe("Welcome to the Roboflow API.");
  expect(body.instructions).toBe(
    "Retrieve your API Key from your workspace settings and pass it as `api_key` in the request body or query parameters, or through an `Authorization: Bearer <api_key>` header."
  );
  expect(body.docs).toBe("https://docs.roboflow.com");
  expect(body.workspace).toBeUndefined();
});

test("test get workspace", async () => {
  const name = await roboflow.root().then((r) => r.workspace);
  if (!name) {
    throw new Error("Failed to get a valid workspace name.");
  }

  const body = await roboflow.workspace(name);
  const workspace = body.workspace;
  expect(typeof workspace.name).toBe("string");
  expect(typeof workspace.url).toBe("string");
  expect(typeof workspace.members).toBe("number");
  expect(workspace.projects).toBeDefined();
  expect(workspace.projects?.length).toBeTruthy();
});

test("test get workspace (unauthenticated)", async () => {
  const roboflow = new RoboflowClient("", {
    debug: process.env.DEBUG === "true",
  });

  try {
    await roboflow.workspace("workspace");
    throw new Error("Expected exception to be thrown.");
  } catch (err) {
    const isInstance = err instanceof RoboflowClientHttpError;
    expect(isInstance).toBeTruthy();
    if (isInstance) {
      expect(err.res).toBeDefined();
    }
  }
});

test("test get project", async () => {
  const workspaceName = await roboflow.root().then((r) => r.workspace);
  if (!workspaceName) {
    throw new Error("Failed to get a valid workspace name.");
  }

  const res = await roboflow.workspace(workspaceName);
  if (!res.workspace.projects?.length) {
    throw new Error("Failed to get a valid project name.");
  }

  const projectName = res.workspace.projects[0].name;
  const body = await roboflow.project(workspaceName, projectName);
  expect(body.workspace).toBeDefined();
  expect(body.project).toBeDefined();
});

test("test get project (unauthenticated)", async () => {
  const roboflow = new RoboflowClient("", {
    debug: process.env.DEBUG === "true",
  });

  try {
    await roboflow.project("workspace", "project");
    throw new Error("Expected exception to be thrown.");
  } catch (err) {
    const isInstance = err instanceof RoboflowClientHttpError;
    expect(isInstance).toBeTruthy();
    if (isInstance) {
      expect(err.res).toBeDefined();
    }
  }
});

test("test get version", async () => {
  const workspaceName = await roboflow.root().then((r) => r.workspace);
  if (!workspaceName) {
    throw new Error("Failed to get a valid workspace name.");
  }

  const res = await roboflow.workspace(workspaceName);
  if (!res.workspace.projects?.length) {
    throw new Error("Failed to get a valid project name.");
  }

  const projectName = res.workspace.projects[0].name;
  const { project } = await roboflow.project(workspaceName, projectName);
  const body = await roboflow.version(
    workspaceName,
    projectName,
    project.versions
  );
  expect(body.workspace).toBeDefined();
  expect(body.project).toBeDefined();
  expect(body.version).toBeDefined();
});

test("test get version (unauthenticated)", async () => {
  const roboflow = new RoboflowClient("", {
    debug: process.env.DEBUG === "true",
  });

  try {
    await roboflow.version("workspace", "project", 1);
    throw new Error("Expected exception to be thrown.");
  } catch (err) {
    const isInstance = err instanceof RoboflowClientHttpError;
    expect(isInstance).toBeTruthy();
    if (isInstance) {
      expect(err.res).toBeDefined();
    }
  }
});

test("test get format", async () => {
  const workspaceName = await roboflow.root().then((r) => r.workspace);
  if (!workspaceName) {
    throw new Error("Failed to get a valid workspace name.");
  }

  const res = await roboflow.workspace(workspaceName);
  if (!res.workspace.projects?.length) {
    throw new Error("Failed to get a valid project name.");
  }

  const projectName = res.workspace.projects[0].name;
  const { project } = await roboflow.project(workspaceName, projectName);
  const { version } = await roboflow.version(
    workspaceName,
    projectName,
    project.versions
  );
  const format = version.exports[0];
  const body = await roboflow.format(
    workspaceName,
    projectName,
    project.versions,
    format
  );
  expect(body.workspace).toBeDefined();
  expect(body.project).toBeDefined();
  expect(body.version).toBeDefined();
  expect(body.export.format).toBe(format);
  expect(typeof body.export.link).toEqual("string");
});
