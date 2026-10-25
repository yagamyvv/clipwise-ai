import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const title = String(body.title ?? 'Untitled video');
  const duration = String(body.duration ?? '00:32:14');

  const clipSegments = [
    {
      id: 'clip-001',
      title: `${title} — Hook + insight`,
      timestamp: '00:14 - 00:42',
      description: 'Strong opening, clear hook, and an emotional payoff that performs well for short-form content.',
      score: 0.92,
    },
    {
      id: 'clip-002',
      title: `${title} — Best takeaway`,
      timestamp: '00:53 - 01:16',
      description: 'High retention segment with actionable value and easy-to-follow delivery.',
      score: 0.88,
    },
    {
      id: 'clip-003',
      title: `${title} — CTA close`,
      timestamp: '01:18 - 01:42',
      description: 'Conversion-friendly closing with sharp summary and clear call to action.',
      score: 0.83,
    },
  ];

  return Response.json({
    ok: true,
    mode: 'demo-ai-integration',
    note: 'Replace with live provider orchestration in production (Whisper + scene analysis + clip ranker).',
    duration,
    clips: clipSegments,
  });
}

