import Link from 'next/link';

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a12] px-4 py-8 text-white md:px-6">
      <div className="mx-auto max-w-4xl">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Account</p>
            <h1 className="mt-2 text-3xl font-black">Settings</h1>
          </div>
          <Link href="/dashboard" className="secondary-button">Return</Link>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="panel p-5">
            <h2 className="text-xl font-bold">Profile</h2>
            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-sm text-zinc-300">Display name</label>
                <input value="Ava Creator" className="w-full rounded-xl border border-white/10 bg-[#12131a] px-4 py-3" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-zinc-300">Email</label>
                <input value="ava@clipwise.ai" className="w-full rounded-xl border border-white/10 bg-[#12131a] px-4 py-3" />
              </div>
              <button className="primary-button w-full">Save profile</button>
            </div>
          </section>

          <section className="panel p-5">
            <h2 className="text-xl font-bold">Plan & billing</h2>
            <div className="mt-5 rounded-2xl border border-primary-500/40 bg-primary-500/10 p-4">
              <p className="text-sm text-primary-100">Pro plan</p>
              <p className="mt-3 text-3xl font-black">$49/mo</p>
              <p className="mt-2 text-sm text-zinc-300">Includes 150 generated clips, team workspace, and export presets.</p>
            </div>
            <button className="secondary-button mt-5 w-full">Manage subscription</button>
          </section>
        </div>
      </div>
    </main>
  );
}
