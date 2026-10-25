import type { Project, User } from './types';

const STORAGE_KEYS = {
  users: 'clipwise-users',
  projects: 'clipwise-projects',
  currentUser: 'clipwise-current-user',
};

const defaultUser: User = {
  id: 'demo-user',
  name: 'Ava Creator',
  email: 'ava@clipwise.ai',
  createdAt: new Date().toISOString(),
};

const defaultProjects: Project[] = [
  {
    id: 'project-1',
    userId: 'demo-user',
    title: 'Creator deep dive interview',
    sourceType: 'upload',
    sourceValue: 'local-upload',
    duration: '00:32:14',
    status: 'completed',
    createdAt: '2026-10-18T08:20:00.000Z',
    clips: [
      { id: 'clip-1', title: 'Hook + key insight', timestamp: '00:12 - 00:39', status: 'ready' },
      { id: 'clip-2', title: 'Biggest mistake to avoid', timestamp: '00:52 - 01:14', status: 'ready' },
    ],
  },
  {
    id: 'project-2',
    userId: 'demo-user',
    title: 'Product launch breakdown',
    sourceType: 'youtube',
    sourceValue: 'https://youtu.be/example',
    duration: '00:24:11',
    status: 'analyzing',
    createdAt: '2026-10-22T10:00:00.000Z',
    clips: [
      { id: 'clip-3', title: 'Engagement spike', timestamp: '00:08 - 00:28', status: 'processing' },
      { id: 'clip-4', title: 'Feature walkthrough', timestamp: '00:43 - 01:06', status: 'processing' },
    ],
  },
];

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function readSeededData() {
  if (typeof window === 'undefined') return;

  const users = readStorage<User[]>(STORAGE_KEYS.users, [defaultUser]);
  const projects = readStorage<Project[]>(STORAGE_KEYS.projects, defaultProjects);

  if (!window.localStorage.getItem(STORAGE_KEYS.users)) {
    writeStorage(STORAGE_KEYS.users, users);
  }

  if (!window.localStorage.getItem(STORAGE_KEYS.projects)) {
    writeStorage(STORAGE_KEYS.projects, projects);
  }

  if (!window.localStorage.getItem(STORAGE_KEYS.currentUser)) {
    writeStorage(STORAGE_KEYS.currentUser, defaultUser);
  }
}

export function listUsers() {
  return readStorage<User[]>(STORAGE_KEYS.users, [defaultUser]);
}

export function saveUser(user: User) {
  const currentUsers = listUsers();
  const nextUsers = currentUsers.some((entry) => entry.id === user.id)
    ? currentUsers.map((entry) => (entry.id === user.id ? user : entry))
    : [user, ...currentUsers];

  writeStorage(STORAGE_KEYS.users, nextUsers);
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;

  const raw = window.localStorage.getItem(STORAGE_KEYS.currentUser);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User | null) {
  if (typeof window === 'undefined') return;

  if (!user) {
    window.localStorage.removeItem(STORAGE_KEYS.currentUser);
    return;
  }

  writeStorage(STORAGE_KEYS.currentUser, user);
}

export function listProjects(userId?: string): Project[] {
  const projects = readStorage<Project[]>(STORAGE_KEYS.projects, defaultProjects);
  if (!userId) return projects;
  return projects.filter((project) => project.userId === userId);
}

export function createProject(project: Omit<Project, 'id' | 'createdAt'> & { id?: string; createdAt?: string }): Project {
  const stored = readStorage<Project[]>(STORAGE_KEYS.projects, defaultProjects);
  const newProject: Project = {
    ...project,
    id: project.id ?? `project-${Date.now()}`,
    createdAt: project.createdAt ?? new Date().toISOString(),
  };

  writeStorage(STORAGE_KEYS.projects, [newProject, ...stored]);
  return newProject;
}

export function saveProject(project: Project) {
  const stored = readStorage<Project[]>(STORAGE_KEYS.projects, defaultProjects);
  const nextProjects = stored.map((entry) => (entry.id === project.id ? project : entry));
  writeStorage(STORAGE_KEYS.projects, nextProjects);
}

export function deleteProject(projectId: string) {
  const stored = readStorage<Project[]>(STORAGE_KEYS.projects, defaultProjects);
  writeStorage(STORAGE_KEYS.projects, stored.filter((project) => project.id !== projectId));
}

