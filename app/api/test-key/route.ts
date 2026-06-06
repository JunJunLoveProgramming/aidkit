import { testApiKey } from '@/src/lib/ai';

export async function POST(req: Request) {
  try {
    const { apiKey } = await req.json();

    if (!apiKey) {
      return new Response(JSON.stringify({ error: '请提供 API Key' }), { status: 400 });
    }

    const result = await testApiKey(apiKey);

    if (result.success) {
      return new Response(JSON.stringify({ success: true, message: 'API Key 有效' }));
    } else {
      return new Response(JSON.stringify({ error: result.error }), { status: 400 });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : '测试失败' }),
      { status: 500 }
    );
  }
}