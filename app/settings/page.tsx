"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { listProjects, type Project } from '@/lib/storage';

export default function EditorPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [title, setTitle] = useState('The 3 biggest mistakes creators make');
  const [hook, setHook] = useState('Stop chasing hacks — build a repeatable system.');
  const [subtitleColor, setSubtitleColor] = useState('#f5f3ff');
  const [fontSize, setFontSize] = useState(26);

  useEffect(() => {
    const found = listProjects().find((item) => item.id === params.id);
    setProject(found ?? null);
  }, [params.id]);

  if (!project) {
    return <div className="min-h-screen bg-[#0a0a12] text-white">Loading editor...</div>;
  }

  return (
    <main className="min-h-screen bg-[#0a0a12] px-4 py-8 text-white md:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Editor</p>
            <h1 className="mt-2 text-3xl font-black">{project.title}</h1>
          </div>
          <Link href={`/projects/${project.id}`} className="secondary-button">Back to project</Link>
        </header>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="panel p-5">
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-zinc-300">Clip title</label>
                <input value={title} onChange={(event) => setTitle(event.target.value)} className="w-full rounded-xl border border-white/10 bg-[#12131a] px-4 py-3" />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">Hook</label>
                <textarea value={hook} onChange={(event) => setHook(event.target.value)} className="min-h-[110px] w-full rounded-xl border border-white/10 bg-[#12131a] px-4 py-3" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-zinc-300">Subtitle color</label>
                  <input type="color" value={subtitleColor} onChange={(event) => setSubtitleColor(event.target.value)} className="h-12 w-full rounded-xl border border-white/10 bg-transparent" />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-zinc-300">Font size</label>
                  <input type="range" min={16} max={42} value={fontSize} onChange={(event) => setFontSize(Number(event.target.value))} className="w-full" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">Template</label>
                <select className="w-full rounded-xl border border-white/10 bg-[#12131a] px-4 py-3">
                  <option>Modern minimal</option>
                  <option>Bold contrast</option>
                  <option>Creator studio</option>
                </select>
              </div>

              <button className="primary-button w-full">Apply changes</button>
            </div>
          </div>

          <div className="panel overflow-hidden p-4">
            <div className="mx-auto h-[620px] max-w-[340px] rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-zinc-900 to-violet-950 p-3 shadow-glow">
              <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950 p-4">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-zinc-300">
                  <span>Clip</span>
                  <span>9:16</span>
                </div>
                <div className="space-y-3">
                  <div className="rounded-full bg-white/5 px-3 py-2 text-center text-[10px] uppercase tracking-[0.2em] text-primary-200">AI highlight</div>
                  <h2 className="text-2xl font-black leading-tight">{title}</h2>
                  <p className="text-sm text-zinc-300">{hook}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-center text-xs text-zinc-200">00:31</div>
                <div
                  className="rounded-2xl px-3 py-2 text-center font-semibold"
                  style={{
                    color: subtitleColor,
                    fontSize: `${fontSize}px`,
                    background: 'rgba(0,0,0,0.35)',
                  }}
                >
                  Stop chasing hacks — build a repeatable system.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
