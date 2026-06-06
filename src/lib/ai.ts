// 默认从环境变量读取 API Key（作为 fallback）
const defaultApiKey = process.env.DEEPSEEK_API_KEY;
const baseURL = 'https://api.deepseek.com/v1';

if (!defaultApiKey) {
  console.warn('DEEPSEEK_API_KEY 未在环境变量中设置，请在设置页面配置 API Key');
}

// 获取有效的 API Key（优先使用传入的，否则使用环境变量）
function getApiKey(customKey?: string): string {
  const key = customKey || defaultApiKey;
  if (!key) {
    throw new Error('API Key 未配置，请在设置页面或 .env.local 中配置');
  }
  return key;
}

// 发送请求到 DeepSeek API
async function makeRequest(
  messages: { role: string; content: string }[],
  stream: boolean = false,
  customApiKey?: string
) {
  const apiKey = getApiKey(customApiKey);

  const response = await fetch(`${baseURL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages,
      stream,
      max_tokens: 4096,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || `API请求失败: ${response.status}`);
  }

  return response;
}

// 测试 API Key 是否有效
export async function testApiKey(apiKey: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: 'Hi' }],
        max_tokens: 10,
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorData = await response.json().catch(() => null);
      return { success: false, error: errorData?.error?.message || 'API Key 无效' };
    }
  } catch (error) {
    return { success: false, error: '网络错误，请检查连接' };
  }
}

// 翻译文本
export async function translateText(
  prompt: string,
  sourceLang: string,
  targetLang: string,
  customApiKey?: string
) {
  const systemPrompt = `你是一个专业的翻译助手。请将以下文本从 ${sourceLang} 翻译成 ${targetLang}。
翻译规则：
1. 保持原文意思准确完整
2. 译文流畅自然，符合目标语言表达习惯
3. 不增减语义
4. 专业术语准确翻译`;

  const response = await makeRequest(
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt },
    ],
    true,
    customApiKey
  );

  return response;
}

// 生成代码注释
export async function generateCodeComments(
  code: string,
  language: string,
  customApiKey?: string
) {
  const systemPrompt = `你是一个资深的${language}程序员。请为以下代码添加详细的注释。

注释规则：
1. 为每个函数添加函数级注释，说明功能、参数、返回值
2. 为复杂的逻辑块添加行级注释
3. 注释使用中文
4. 保持代码格式清晰可读
5. 只返回带有注释的代码，不要添加额外解释`;

  const response = await makeRequest(
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: code },
    ],
    false,
    customApiKey
  );

  const data = await response.json();
  return data.choices[0]?.message?.content || '';
}

// 总结文本
export async function summarizeText(text: string, customApiKey?: string) {
  const systemPrompt = `你是一个专业的文本摘要助手。请对以下文本进行总结：

要求：
1. 提取3个核心要点，用数字列表表示（如 1. 要点内容）
2. 每个要点不超过50字
3. 最后添加一句50字以内的极简短评
4. 整个回复不超过300字
5. 使用中文输出`;

  const response = await makeRequest(
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: text },
    ],
    false,
    customApiKey
  );

  const data = await response.json();
  return data.choices[0]?.message?.content || '';
}