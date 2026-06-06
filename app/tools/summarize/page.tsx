'use client';

import { useState } from 'react';
import { FileText, Copy, Check, AlertCircle, Trash2, Sparkles } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Navbar } from '@/src/components/Navbar';

export default function SummarizePage() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const maxLength = 2000;
  const currentLength = text.length;
  const isOverLimit = currentLength >= maxLength;

  const handleSummarize = async () => {
    if (!text.trim()) {
      setError('请输入要总结的文本');
      return;
    }

    setError('');
    setIsLoading(true);
    setResult('');

    try {
      // 从 localStorage 读取 API Key
      const apiKey = localStorage.getItem('deepseek_api_key');

      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, apiKey }),
      });

      if (!response.ok) {
        throw new Error('请求失败');
      }

      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '总结失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setText('');
    setResult('');
    setError('');
  };

  const parseResult = () => {
    if (!result) return { points: [], summary: '' };
    
    const lines = result.split('\n').filter(line => line.trim());
    const points: { number: string; text: string }[] = [];
    let summary = '';
    
    lines.forEach(line => {
      if (line.match(/^\d+\./)) {
        points.push({
          number: line.match(/^\d+/)?.[0] || '',
          text: line.replace(/^\d+\.\s*/, '')
        });
      } else if (line.trim()) {
        summary = line;
      }
    });
    
    return { points, summary };
  };

  const { points, summary } = parseResult();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-50 via-white to-pink-50"></div>
      <div className="fixed top-20 -left-32 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="fixed bottom-20 -right-32 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <Navbar currentPage="tools" />

      <main className="pt-24 pb-16 px-4 relative">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI总结器</h1>
              <p className="text-mutedForeground">一键提炼文章精华，快速掌握核心要点</p>
            </div>
          </div>

          <Card className="border-0 shadow-lg overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
              <div className="flex items-center gap-2 text-white/90">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/50"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="text-sm font-medium">AI 智能总结</span>
              </div>
            </div>
            
            <CardContent className="p-6 md:p-8">
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-mutedForeground">
                  文本内容
                </label>
                <div className="relative">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value.slice(0, maxLength))}
                    placeholder="请粘贴要总结的长文本（最多2000字）..."
                    className="w-full h-64 px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:border-transparent placeholder:text-gray-400"
                    disabled={isLoading}
                  />
                  <div className={`absolute bottom-3 right-3 text-xs px-2 py-1 rounded-full ${
                    isOverLimit ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {currentLength} / {maxLength}
                  </div>
                </div>
              </div>

              {error && (
                <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={handleSummarize}
                  className="flex-1 h-12 text-base shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                  disabled={isLoading || !text.trim()}
                >
                  {isLoading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      总结中...
                    </>
                  ) : (
                    <>生成总结</>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClear}
                  disabled={isLoading || !text.trim()}
                  className="h-12 px-6"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {result && (
            <Card className="border-0 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-medium">总结结果</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-9 text-white/80 hover:text-white"
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
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <div className="space-y-4">
                  {points.map((point, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                        {point.number}
                      </div>
                      <div>
                        <p className="text-foreground font-medium">{point.text}</p>
                      </div>
                    </div>
                  ))}
                  
                  {summary && (
                    <div className="flex gap-4 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-purple-700 mb-1">简评</div>
                        <p className="text-foreground">{summary}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-purple-600 mb-1">3</div>
              <div className="text-sm text-mutedForeground">核心要点</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-pink-600 mb-1">50字</div>
              <div className="text-sm text-mutedForeground">极简短评</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-rose-600 mb-1">2000</div>
              <div className="text-sm text-mutedForeground">最大字数</div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-100 py-8 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl text-center text-sm text-mutedForeground">
          <p>AidKit - AI 总结工具</p>
        </div>
      </footer>
    </div>
  );
}
