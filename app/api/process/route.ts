import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const title = String(body.title ?? 'Untitled video');

  const subtitles = [
    { start: '00:00', end: '00:03', text: 'Here is the main story behind this video.' },
    { start: '00:03', end: '00:06', text: 'Most creators miss the real leverage point.' },
    { start: '00:06', end: '00:10', text: `Here is how ${title} becomes more engaging in a short format.` },
  ];

  return Response.json({
    ok: true,
    mode: 'demo-subtitles',
    subtitles,
  });
}

