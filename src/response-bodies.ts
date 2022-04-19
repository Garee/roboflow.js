export interface RootResponseBody {
  welcome: string;
  instructions: string;
  docs: string;
  workspace?: string;
}

export interface WorkspaceResponseBody {
  workspace: Workspace;
}

export interface ProjectResponseBody {
  workspace: Workspace;
  project: Project;
  versions: Version[];
}

export interface VersionResponseBody {
  workspace: Workspace;
  project: Project;
  version: Version;
}

export interface FormatResponseBody {
  workspace: Workspace;
  project: Project;
  version: Version;
  export: Export;
}

export interface Workspace {
  name: string;
  url: string;
  members: number;
  projects?: Project[];
}

interface Project {
  id: string;
  type: string;
  name: string;
  created: number;
  updated: number;
  images: 12;
  unannotated: 12;
  annotation: string;
  public: boolean;
  splits: {
    train: number;
    valid: number;
    test: number;
  };
  colors: Record<string, string>;
  classes: Record<string, number>;
  versions: number;
}

export interface Version {
  id: string;
  name: string;
  created: number;
  images: number;
  splits: {
    train: number;
    valid: number;
    test: number;
  };
  model?: unknown;
  preprocessing: Record<string, unknown>;
  augmentation: Record<string, unknown>;
  exports: string[];
}

export interface Export {
  format: string;
  link: string;
}
