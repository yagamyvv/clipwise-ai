import Link from 'next/link';

const featureCards = [
  {
    title: 'AI highlight detection',
    description: 'Identifies the most engaging moments from long-form content based on pacing, speaker emphasis, and sentiment. ',
  },
  {
    title: 'Auto subtitles',
    description: 'Instant captions for reels, shorts and vertical videos with editable text and styling controls.',
  },
  {
    title: 'Instant branded edits',
    description: 'Use vertical templates, hooks, and CTA overlays to publish shorts without additional editing work.',
  },
];

const stats = [
  { label: 'Creators', value: '12k+' },
  { label: 'Clips generated', value: '84k' },
  { label: 'Avg boost', value: '4.8x' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-hero text-white">
      <header className="section-shell flex items-center justify-between py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-500/20 text-lg font-bold text-primary-200">
            C
          </div>
          <div>
            <p className="text-lg font-semibold">Clipwise AI</p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
          <Link href="#features">Features</Link>
          <Link href="#workflow">Workflow</Link>
          <Link href="#pricing">Pricing</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/auth" className="secondary-button px-4 py-2 text-xs uppercase tracking-[0.2em] text-zinc-200">
            Login
          </Link>
          <Link href="/dashboard" className="primary-button px-4 py-2 text-xs uppercase tracking-[0.2em]">
            Start Free
          </Link>
        </div>
      </header>

      <section className="section-shell grid items-center gap-10 pb-16 pt-10 md:grid-cols-2 md:pt-16">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1.5 text-xs font-medium text-primary-100">
            AI-powered short-form creation
          </div>
          <h1 className="max-w-xl text-4xl font-black leading-tight md:text-6xl">
            Turn every long video into <span className="gradient-text">viral clips</span>
          </h1>
          <p className="mt-5 max-w-lg text-base text-zinc-300 md:text-lg">
            Clipwise helps content creators transform long-form videos into smart, polished short-form assets for TikTok, Reels, and Shorts with AI analysis, subtitles, and templates.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard" className="primary-button text-sm">
              Try dashboard
            </Link>
            <Link href="/upload" className="secondary-button text-sm">
              Upload a video
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-8 text-sm text-zinc-300">
            <div>
              <p className="text-2xl font-bold text-white">2.4x</p>
              <p>faster publishing</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">9:16</p>
              <p>vertical-first</p>
            </div>
          </div>
        </div>

        <div className="panel relative overflow-hidden p-4 shadow-glow">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950 p-4">
            <div className="flex items-center justify-between pb-3 text-xs text-zinc-400">
              <span>Creator dashboard</span>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-1 text-emerald-300">Live</span>
            </div>
            <div className="rounded-[1.65rem] bg-gradient-to-br from-[#1f2937] via-[#18181b] to-[#3b0764] p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-300">Project</p>
                  <p className="text-xl font-bold">Creator Deep Dive</p>
                </div>
                <div className="rounded-full bg-primary-500/20 px-3 py-1 text-xs font-semibold text-primary-100">AI mode</div>
              </div>
              <div className="h-52 rounded-[1.5rem] bg-gradient-to-br from-zinc-800 to-zinc-950 p-4">
                <div className="flex h-full items-end justify-between">
                  <div className="space-y-3">
                    <div className="w-28 rounded-full bg-primary-500/30 px-3 py-2 text-center text-xs text-primary-100">Hook</div>
                    <div className="w-40 rounded-full bg-white/5 px-3 py-2 text-center text-xs text-zinc-200">3 viral moments</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-zinc-200">00:31</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-2">
                    <p className="text-xl font-bold text-white">{item.value}</p>
                    <p className="text-[10px] text-zinc-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="section-shell py-16">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-200">Features</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Everything needed to publish more shorts</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featureCards.map((card) => (
            <div key={card.title} className="panel p-6">
              <div className="mb-5 h-12 w-12 rounded-2xl bg-primary-500/15 text-primary-100 flex items-center justify-center font-bold">AI</div>
              <h3 className="mb-2 text-xl font-semibold">{card.title}</h3>
              <p className="text-sm leading-6 text-zinc-300">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="section-shell pb-16">
        <div className="panel p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-200">Workflow</p>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {['Upload video', 'Analyze moments', 'Generate clips', 'Publish'].map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/20 text-sm font-bold text-primary-100">
                  {index + 1}
                </div>
                <p className="font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="section-shell pb-20">
        <div className="panel p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-200">Pricing</p>
          <h3 className="mt-3 text-3xl font-bold">Launch faster with creator-focused plans</h3>
          <div className="mt-8 flex flex-col justify-center gap-4 md:flex-row">
            <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:max-w-xs">
              <p className="text-sm text-zinc-300">Starter</p>
              <p className="mt-3 text-4xl font-black">$19</p>
              <p className="mt-2 text-sm text-zinc-400">per month</p>
            </div>
            <div className="w-full rounded-2xl border border-primary-500/40 bg-primary-500/10 p-6 md:max-w-xs">
              <p className="text-sm text-primary-100">Pro</p>
              <p className="mt-3 text-4xl font-black">$49</p>
              <p className="mt-2 text-sm text-primary-100/80">per month</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
