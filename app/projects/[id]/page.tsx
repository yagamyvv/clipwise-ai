import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const title = String(body.title ?? 'Untitled video');

  return Response.json({
    ok: true,
    status: 'processing',
    stages: ['uploading', 'analyzing', 'generating', 'subtitles', 'completed'],
    projectTitle: title,
    note: 'This is the integration-ready workflow for a real AI pipeline.',
  });
}

