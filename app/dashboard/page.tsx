"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signInWithEmail, signUpWithEmail } from '@/lib/auth';

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('Ava Creator');
  const [email, setEmail] = useState('ava@clipwise.ai');
  const [password, setPassword] = useState('demo1234');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'register') {
        const result = await signUpWithEmail({ name, email, password });
        if (!result.success) {
          setError(result.message || 'Unable to create account.');
          return;
        }
      } else {
        const result = await signInWithEmail({ email, password });
        if (!result.success) {
          setError(result.message || 'Unable to sign in.');
          return;
        }
      }

      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a12] px-4 py-10 text-white">
      <div className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-500/20 font-bold text-primary-100">C</div>
            <div>
              <p className="text-lg font-semibold">Clipwise AI</p>
            </div>
          </div>
          <Link href="/" className="text-sm text-zinc-300">Home</Link>
        </div>

        <div className="mb-6 flex gap-2 rounded-2xl bg-white/5 p-1">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold ${mode === 'login' ? 'bg-primary-500 text-white' : 'text-zinc-300'}`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold ${mode === 'register' ? 'bg-primary-500 text-white' : 'text-zinc-300'}`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="mb-2 block text-sm text-zinc-300">Full name</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#12131a] px-4 py-3 outline-none placeholder:text-zinc-500"
                placeholder="Ava Creator"
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm text-zinc-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#12131a] px-4 py-3 outline-none placeholder:text-zinc-500"
              placeholder="creator@clipwise.ai"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#12131a] px-4 py-3 outline-none placeholder:text-zinc-500"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-rose-300">{error}</p>}

          <button type="submit" disabled={loading} className="primary-button w-full disabled:opacity-60">
            {loading ? 'Please wait...' : mode === 'login' ? 'Access workspace' : 'Create account'}
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm text-zinc-300">
          Demo mode is active by default. Sign up or log in to create real user-scoped projects in browser storage.
        </div>
      </div>
    </main>
  );
}

