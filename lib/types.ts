import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const url = String(form.get('youtubeUrl') ?? '');
  const file = form.get('video');

  if (!file && !url) {
    return Response.json({ ok: false, error: 'Video upload or YouTube URL is required.' }, { status: 400 });
  }

  const hasValidUrl = url === '' || /^https?:\/\//.test(url);
  if (!hasValidUrl) {
    return Response.json({ ok: false, error: 'Please provide a valid video URL.' }, { status: 400 });
  }

  return Response.json({
    ok: true,
    mode: 'demo-upload',
    message: 'Upload validated. The app is ready to queue the AI processing workflow.',
    source: url || (file ? 'selected-local-file' : 'unknown'),
  });
}
