export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  images?: string[];
  video?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectsResponse {
  projects: Project[];
  total?: number;
}

export interface CreateProjectRequest {
  title: string;
  description: string;
  category: string;
  location: string;
  images?: File[];
  video?: File;
}

export interface UpdateProjectRequest extends CreateProjectRequest {}
