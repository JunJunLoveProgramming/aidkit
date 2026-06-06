import { summarizeText } from '@/src/lib/ai';

export async function POST(req: Request) {
  try {
    const { text, apiKey } = await req.json();

    if (!text) {
      return new Response(JSON.stringify({ error: '缺少必要参数' }), { status: 400 });
    }

    // 使用前端传递的 API Key，如果没有则使用环境变量中的
    const result = await summarizeText(text, apiKey);

    return new Response(JSON.stringify({ result }), { status: 200 });
  } catch (error) {
    console.error('总结API错误:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : '总结失败' }),
      { status: 500 }
    );
  }
}