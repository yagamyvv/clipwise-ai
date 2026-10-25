"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createProject, getCurrentUser } from '@/lib/storage';

export default function UploadPage() {
  const router = useRouter();
  const [title, setTitle] = useState('Creator deep dive interview');
  const [sourceUrl, setSourceUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'validating' | 'ready'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const currentUser = getCurrentUser();
    if (!currentUser) {
      setMessage('Please sign in to create a project.');
      return;
    }

    setStatus('validating');

    if (!title.trim()) {
      setMessage('Project title is required.');
      setStatus('idle');
      return;
    }

    if (!sourceUrl.trim() && !('videoFile' in event.target)) {
      setMessage('Add either a video upload or a valid YouTube link.');
      setStatus('idle');
      return;
    }

    const project = createProject({
      userId: currentUser.id,
      title,
      sourceType: sourceUrl.trim() ? 'youtube' : 'upload',
      sourceValue: sourceUrl.trim() || 'local-upload',
      duration: '00:32:14',
      status: 'analyzing',
      clips: [
        {
          id: `clip-${Date.now()}`,
          title: 'Hook + key insight',
          timestamp: '00:30 - 00:54',
          status: 'ready',
        },
      ],
    });

    setStatus('ready');
    setMessage('Video validated and queued for AI analysis.');
    router.push(`/projects/${project.id}`);
  };

  return (
    <main className="min-h-screen bg-[#0a0a12] px-4 py-8 text-white md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Import</p>
            <h1 className="mt-2 text-3xl font-black">Upload video</h1>
          </div>
          <Link href="/dashboard" className="secondary-button">Back to dashboard</Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={handleSubmit} className="panel p-5 md:p-6">
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-zinc-300">Project title</label>
                <input value={title} onChange={(event) => setTitle(event.target.value)} className="w-full rounded-xl border border-white/10 bg-[#12131a] px-4 py-3 outline-none" placeholder="e.g. Marketing breakdown reel" />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">Import video</label>
                <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-5">
                  <input type="file" accept="video/*" className="w-full cursor-pointer text-zinc-400" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">YouTube URL (optional)</label>
                <input value={sourceUrl} onChange={(event) => setSourceUrl(event.target.value)} className="w-full rounded-xl border border-white/10 bg-[#12131a] px-4 py-3 outline-none" placeholder="https://youtu.be/..." />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm text-zinc-300">
                <p className="font-medium text-white">Validation checks</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-400">
                  <li>Supported formats: MP4, MOV, WebM</li>
                  <li>Max file size: 2 GB</li>
                  <li>Minimum video length: 30 seconds</li>
                </ul>
              </div>

              <button type="submit" className="primary-button w-full" disabled={status === 'validating'}>
                {status === 'validating' ? 'Validating...' : 'Analyze video'}
              </button>
              {message && <p className="text-sm text-primary-200">{message}</p>}
            </div>
          </form>

          <aside className="panel p-5">
            <h2 className="text-xl font-bold">Processing workflow</h2>
            <div className="mt-5 space-y-4">
              {['Uploading', 'Analyzing', 'Generating clips', 'Creating subtitles', 'Completed'].map((step, index) => (
                <div key={step} className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold ${index === 0 ? 'border-primary-500 bg-primary-500/20 text-primary-100' : 'border-white/10 bg-white/5 text-zinc-300'}`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{step}</p>
                    <p className="text-sm text-zinc-400">{index === 0 ? 'Upload is queued and validated.' : 'AI pipeline remains operational.'}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
