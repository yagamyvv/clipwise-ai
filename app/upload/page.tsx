"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCurrentUser, listProjects, readSeededData, type Project, type User } from '@/lib/storage';

const statusColors: Record<string, string> = {
  uploading: 'bg-sky-500/15 text-sky-200',
  analyzing: 'bg-violet-500/15 text-violet-200',
  generating: 'bg-amber-500/15 text-amber-200',
  subtitles: 'bg-indigo-500/15 text-indigo-200',
  completed: 'bg-emerald-500/15 text-emerald-200',
  failed: 'bg-rose-500/15 text-rose-200',
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    readSeededData();
    const current = getCurrentUser();
    setUser(current);
    setProjects(listProjects(current?.id ?? 'demo-user'));
  }, []);

  const totalClips = projects.reduce((acc, project) => acc + (project.clips?.length ?? 0), 0);

  return (
    <main className="min-h-screen bg-[#0a0a12] px-4 pb-16 pt-6 text-white md:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Workspace</p>
            <h1 className="mt-2 text-3xl font-black">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/upload" className="primary-button">Upload video</Link>
            <Link href="/settings" className="secondary-button">Settings</Link>
          </div>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="metric-card">
            <p className="text-sm text-zinc-400">Projects</p>
            <p className="mt-3 text-3xl font-black">{projects.length}</p>
          </div>
          <div className="metric-card">
            <p className="text-sm text-zinc-400">Processed</p>
            <p className="mt-3 text-3xl font-black">{projects.filter((project) => project.status === 'completed').length}</p>
          </div>
          <div className="metric-card">
            <p className="text-sm text-zinc-400">Clips</p>
            <p className="mt-3 text-3xl font-black">{totalClips}</p>
          </div>
          <div className="metric-card">
            <p className="text-sm text-zinc-400">Creator</p>
            <p className="mt-3 text-lg font-bold">{user?.name ?? 'Demo creator'}</p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
          <div className="panel p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Recent projects</h2>
              <Link href="/upload" className="text-sm text-primary-200">New project</Link>
            </div>
            <div className="space-y-4">
              {projects.map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`} className="block rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:bg-white/[0.04]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold">{project.title}</p>
                      <p className="mt-1 text-sm text-zinc-400">{project.sourceType === 'youtube' ? 'YouTube import' : 'Direct upload'} • {project.duration}</p>
                    </div>
                    <span className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${statusColors[project.status] ?? 'bg-zinc-500/15 text-zinc-300'}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-zinc-300">
                    <span>{project.clips?.length ?? 0} generated clips</span>
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="panel p-5">
            <h2 className="text-xl font-bold">Processing history</h2>
            <div className="mt-5 space-y-4">
              {projects.slice(0, 4).map((project) => (
                <div key={project.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{project.title}</p>
                    <span className={`rounded-full px-2 py-1 text-[10px] ${statusColors[project.status] ?? 'bg-zinc-500/15 text-zinc-300'}`}>{project.status}</span>
                  </div>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-violet-400" style={{ width: `${project.status === 'completed' ? 100 : project.status === 'failed' ? 35 : 72}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
