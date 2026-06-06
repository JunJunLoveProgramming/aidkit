'use client';

import { useState } from 'react';
import { Languages, ArrowRightLeft, Copy, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Navbar } from '@/src/components/Navbar';

const languages = [
  { value: '中文', label: '中文', flag: 'CN' },
  { value: 'English', label: 'English', flag: 'US' },
  { value: '日本語', label: '日本語', flag: 'JP' },
];

export default function TranslatePage() {
  const [inputText, setInputText] = useState('');
  const [sourceLang, setSourceLang] = useState('中文');
  const [targetLang, setTargetLang] = useState('English');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSwapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    setInputText(result);
    setResult('');
  };

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError('请输入要翻译的文本');
      return;
    }

    setError('');
    setIsLoading(true);
    setResult('');

    try {
      // 从 localStorage 读取 API Key
      const apiKey = localStorage.getItem('deepseek_api_key');

      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: inputText,
          sourceLang,
          targetLang,
          apiKey,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || '翻译失败');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('无法读取响应');
      }

      const decoder = new TextDecoder('utf-8');
      let accumulatedResult = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        
        // 解析 SSE 格式：每行以 "data:" 开头
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            
            try {
              const json = JSON.parse(data);
              const content = json.choices?.[0]?.delta?.content;
              if (content) {
                accumulatedResult += content;
                setResult(accumulatedResult);
              }
            } catch {
              // 忽略解析错误
            }
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '翻译失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-cyan-50"></div>
      <div className="fixed top-20 -left-32 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="fixed bottom-20 -right-32 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <Navbar currentPage="tools" />

      <main className="pt-24 pb-16 px-4 relative">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <Languages className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">文本翻译</h1>
              <p className="text-mutedForeground">支持中文、英文、日文互译，精准流畅</p>
            </div>
          </div>

          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4">
              <div className="flex items-center gap-2 text-white/90">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/50"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="text-sm font-medium">AI 实时翻译</span>
              </div>
            </div>
            
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium mb-2 text-mutedForeground">
                    源语言
                  </label>
                  <div className="relative">
                    <select
                      value={sourceLang}
                      onChange={(e) => setSourceLang(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent cursor-pointer appearance-none"
                      disabled={isLoading}
                    >
                      {languages.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    onClick={handleSwapLanguages}
                    disabled={isLoading}
                    className="h-12 w-12 rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                  >
                    <ArrowRightLeft className="w-5 h-5" />
                  </Button>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-medium mb-2 text-mutedForeground">
                    目标语言
                  </label>
                  <div className="relative">
                    <select
                      value={targetLang}
                      onChange={(e) => setTargetLang(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent cursor-pointer appearance-none"
                      disabled={isLoading}
                    >
                      {languages.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-mutedForeground">
                  输入文本
                </label>
                <div className="relative">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="请输入要翻译的文本..."
                    className="w-full h-40 px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent placeholder:text-gray-400"
                    disabled={isLoading}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {inputText.length} 字
                  </div>
                </div>
              </div>

              {error && (
                <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <Button
                onClick={handleTranslate}
                className="w-full h-12 text-base shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                disabled={isLoading || !inputText.trim()}
              >
                {isLoading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    正在翻译...
                  </>
                ) : (
                  <>开始翻译</>
                )}
              </Button>

              {result && (
                <div className="mt-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                          <Languages className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium">翻译结果</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleCopy}
                        className="h-9"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 mr-1" />
                            已复制
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-1" />
                            复制
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-lg text-foreground whitespace-pre-wrap leading-relaxed">{result}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-blue-600 mb-1">3</div>
              <div className="text-sm text-mutedForeground">支持语言</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-cyan-600 mb-1">实时</div>
              <div className="text-sm text-mutedForeground">流式响应</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-purple-600 mb-1">精准</div>
              <div className="text-sm text-mutedForeground">专业翻译</div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-100 py-8 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl text-center text-sm text-mutedForeground">
          <p>AidKit - AI 翻译工具</p>
        </div>
      </footer>
    </div>
  );
}
