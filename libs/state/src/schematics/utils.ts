import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { JsonParseMode, parseJson } from '@angular-devkit/core';

import { camelize } from 'tslint/lib/utils';
import { WorkspaceProject, WorkspaceSchema } from 'schematics-utilities';
import { ProjectType } from '@nrwl/workspace';

export function getWorkspace(
  host: Tree,
  path = 'angular.json'
): WorkspaceSchema {
  if (!host.exists(path)) {
    throw new SchematicsException(`Could not find angular.json`);
  }

  const workspaceConfigBuffer = host.read(path);
  if (workspaceConfigBuffer === null) {
    throw new SchematicsException(`Could not read angular.json`);
  }

  let workspace: any;
  try {
    workspace = parseJson(
      workspaceConfigBuffer.toString(),
      JsonParseMode.Loose
    );
  } catch (e) {
    throw new SchematicsException(`Could not parse angular.json: ` + e.message);
  }

  return workspace;
}

export function getProject(
  workspace: WorkspaceSchema,
  options: { project: string }
): WorkspaceProject {
  const project: WorkspaceProject =
    workspace.projects[getProjectName(workspace, options)];

  if (!project) {
    throw new SchematicsException(
      'The specified Angular project is not defined in this workspace'
    );
  }

  return project;
}

export function getProjectName(
  workspace: WorkspaceSchema,
  options: { project: string }
): string {
  const projectName: string | undefined =
    options.project || workspace.defaultProject;

  if (projectName === undefined) {
    throw new SchematicsException(
      'No Angular project selected and no default project in the workspace'
    );
  }

  return projectName;
}

export function parseApplicationProject(
  project: WorkspaceProject<ProjectType.Application>
): WorkspaceProject<ProjectType.Application> {
  if (project.projectType !== 'application') {
    throw new SchematicsException(
      `An Angular project type of "application" is required.`
    );
  } else {
    return project;
  }
}

export function parseLibraryProject(
  project: WorkspaceProject
): WorkspaceProject {
  if (project.projectType !== 'library') {
    throw new SchematicsException(
      `An Angular project type of "library" is required.`
    );
  } else {
    return project;
  }
}

export function parseVariant(variant: string): string {
  return camelize(variant);
}
