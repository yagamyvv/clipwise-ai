import Link from 'next/link';

export default function AuthPage() {
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
          <button className="flex-1 rounded-xl bg-primary-500 px-3 py-2 text-sm font-semibold text-white">Login</button>
          <button className="flex-1 rounded-xl px-3 py-2 text-sm font-semibold text-zinc-300">Register</button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-zinc-300">Email</label>
            <input className="w-full rounded-xl border border-white/10 bg-[#12131a] px-4 py-3 outline-none ring-0 placeholder:text-zinc-500" placeholder="creator@clipwise.ai" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-zinc-300">Password</label>
            <input type="password" className="w-full rounded-xl border border-white/10 bg-[#12131a] px-4 py-3 outline-none ring-0 placeholder:text-zinc-500" placeholder="••••••••" />
          </div>
          <button type="button" className="primary-button w-full">Access workspace</button>
        </form>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm text-zinc-300">
          Demo mode: this mock auth flow is ready to connect to a real authentication system like Supabase or Auth0.
        </div>
      </div>
    </main>
  );
}
