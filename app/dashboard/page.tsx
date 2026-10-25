"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCurrentUser, listProjects, type Project } from '@/lib/storage';

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const found = listProjects(currentUser.id).find((item) => item.id === params.id);
    setProject(found ?? null);
  }, [params.id]);

  if (!project) {
    return (
      <main className="min-h-screen bg-[#0a0a12] px-4 py-12 text-white">
        <div className="mx-auto max-w-lg rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-2xl font-bold">Project not found</p>
          <Link href="/dashboard" className="primary-button mt-6">Go back</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a12] px-4 py-8 text-white md:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Project details</p>
            <h1 className="mt-2 text-3xl font-black">{project.title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/editor/${project.id}`} className="primary-button">Edit clip</Link>
            <Link href="/dashboard" className="secondary-button">Dashboard</Link>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="panel p-5">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-lg font-semibold">AI insights</p>
              <span className="rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-primary-100">{project.status}</span>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-violet-950 p-4">
              <div className="mb-4 flex items-center justify-between text-sm text-zinc-300">
                <span>AI analysis</span>
                <span>{project.duration}</span>
              </div>
              <div className="h-56 rounded-[1.4rem] bg-gradient-to-br from-zinc-800 via-zinc-950 to-violet-950 p-4">
                <div className="flex h-full items-end justify-between">
                  <div>
                    <div className="mb-3 rounded-full bg-primary-500/20 px-3 py-2 text-xs text-primary-100">Hook moment</div>
                    <div className="rounded-full bg-white/5 px-3 py-2 text-xs text-zinc-200">{project.clips.length} highlight segments</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-zinc-200">00:31</div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {['Strong hook', 'Clear opinion', 'Pacing boost'].map((insight) => (
                <div key={insight} className="rounded-2xl border border-white/10 bg-white/[0.02] p-3 text-sm text-zinc-200">{insight}</div>
              ))}
            </div>
          </div>

          <div className="panel p-5">
            <h2 className="text-xl font-bold">Generated clips</h2>
            <div className="mt-5 space-y-4">
              {(project.clips ?? []).map((clip) => (
                <div key={clip.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">{clip.title}</p>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-emerald-200">{clip.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-400">Timestamp: {clip.timestamp}</p>
                  <div className="mt-4 flex gap-2">
                    <Link href={`/editor/${project.id}`} className="secondary-button flex-1 justify-center">Preview</Link>
                    <button className="primary-button flex-1 justify-center">Export</button>
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

