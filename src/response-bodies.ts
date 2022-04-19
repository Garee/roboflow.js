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
}

export interface Workspace {
  name: string;
  url: string;
  members: number;
  projects?: ProjectSummary[];
}

interface ProjectShared {
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
  classes: Record<string, number>;
}

export interface ProjectSummary extends ProjectShared {
  versions: number;
}

export interface Project extends ProjectShared {
  versions: VersionSummary[];
}

export interface VersionSummary {
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
