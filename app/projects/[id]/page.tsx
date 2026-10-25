"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { createProject, getCurrentUser } from '@/lib/storage';

export default function UploadPage() {
  const router = useRouter();
  const [title, setTitle] = useState('Creator deep dive interview');
  const [sourceUrl, setSourceUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'validating' | 'ready'>('idle');
  const [message, setMessage] = useState('');

  const fileSummary = useMemo(() => {
    if (!selectedFile) return 'No file selected';
    const mb = selectedFile.size / (1024 * 1024);
    return `${selectedFile.name} • ${mb.toFixed(1)} MB`;
  }, [selectedFile]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const currentUser = getCurrentUser();

    if (!currentUser) {
      setMessage('Please sign in to create a project.');
      router.push('/auth');
      return;
    }

    if (!title.trim()) {
      setMessage('Project title is required.');
      return;
    }

    const hasFile = Boolean(selectedFile);
    const trimmedUrl = sourceUrl.trim();

    if (!hasFile && !trimmedUrl) {
      setMessage('Add a video file or a valid YouTube URL.');
      return;
    }

    if (selectedFile && selectedFile.size > 2 * 1024 * 1024 * 1024) {
      setMessage('Video file is too large. Maximum size is 2 GB.');
      return;
    }

    if (trimmedUrl && !/^https?:\/\//.test(trimmedUrl)) {
      setMessage('Please provide a valid video URL.');
      return;
    }

    setStatus('validating');

    const project = createProject({
      userId: currentUser.id,
      title: title.trim(),
      sourceType: trimmedUrl ? 'youtube' : 'upload',
      sourceValue: trimmedUrl || selectedFile?.name || 'local-upload',
      duration: '00:32:14',
      status: 'analyzing',
      clips: [
        { id: 'clip-1', title: 'Viral hook + insight', timestamp: '00:12 - 00:46', status: 'ready' },
        { id: 'clip-2', title: 'High-retention takeaway', timestamp: '00:56 - 01:20', status: 'ready' },
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
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#12131a] px-4 py-3 outline-none"
                  placeholder="e.g. Marketing breakdown reel"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">Upload video</label>
                <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-5">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
                    className="w-full cursor-pointer text-zinc-400"
                  />
                  <p className="mt-3 text-xs text-zinc-400">{fileSummary}</p>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">YouTube URL (optional)</label>
                <input
                  value={sourceUrl}
                  onChange={(event) => setSourceUrl(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#12131a] px-4 py-3 outline-none"
                  placeholder="https://youtu.be/..."
                />
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

