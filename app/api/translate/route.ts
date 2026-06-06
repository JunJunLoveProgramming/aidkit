import { translateText } from '@/src/lib/ai';

export async function POST(req: Request) {
  try {
    const { prompt, sourceLang, targetLang, apiKey } = await req.json();

    if (!prompt || !sourceLang || !targetLang) {
      return new Response(JSON.stringify({ error: '缺少必要参数' }), { status: 400 });
    }

    // 使用前端传递的 API Key，如果没有则使用环境变量中的
    const response = await translateText(prompt, sourceLang, targetLang, apiKey);

    return response;
  } catch (error) {
    console.error('翻译API错误:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : '翻译失败' }),
      { status: 500 }
    );
  }
}