import { generateCodeComments } from '@/src/lib/ai';

export async function POST(req: Request) {
  try {
    const { code, language, apiKey } = await req.json();

    if (!code || !language) {
      return new Response(JSON.stringify({ error: '缺少必要参数' }), { status: 400 });
    }

    // 使用前端传递的 API Key，如果没有则使用环境变量中的
    const result = await generateCodeComments(code, language, apiKey);

    return new Response(JSON.stringify({ result }), { status: 200 });
  } catch (error) {
    console.error('代码注释API错误:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : '生成失败' }),
      { status: 500 }
    );
  }
}