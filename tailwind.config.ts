@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-[#0a0a12] text-white antialiased selection:bg-primary-500/30;
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

button,
input,
select,
textarea {
  font: inherit;
}

input[type='file'] {
  color: transparent;
}

.gradient-text {
  background: linear-gradient(90deg, #f5f3ff 0%, #c4b5fd 30%, #8b5cf6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.panel {
  @apply rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm;
}

.primary-button {
  @apply inline-flex items-center justify-center rounded-xl bg-primary-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-400;
}

.secondary-button {
  @apply inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10;
}

.metric-card {
  @apply panel p-4 shadow-glow;
}

.section-shell {
  @apply mx-auto max-w-6xl px-4 md:px-6;
}

