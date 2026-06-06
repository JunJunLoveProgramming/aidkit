'use client';

import { useState } from 'react';
import { Code, Copy, Check, AlertCircle } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@/src/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Navbar } from '@/src/components/Navbar';

const languages = [
  { value: 'JavaScript', label: 'JavaScript', mode: 'javascript' },
  { value: 'Python', label: 'Python', mode: 'python' },
];

export default function CodeCommentPage() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!code.trim()) {
      setError('请输入代码');
      return;
    }

    setError('');
    setIsLoading(true);
    setResult('');

    try {
      // 从 localStorage 读取 API Key
      const apiKey = localStorage.getItem('deepseek_api_key');

      const response = await fetch('/api/code-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language, apiKey }),
      });

      if (!response.ok) {
        throw new Error('请求失败');
      }

      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成注释失败，请稍后重试');
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

  const selectedLangMode = languages.find(l => l.value === language)?.mode || 'javascript';

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-green-50 via-white to-emerald-50"></div>
      <div className="fixed top-20 -left-32 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="fixed bottom-20 -right-32 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <Navbar currentPage="tools" />

      <main className="pt-24 pb-16 px-4 relative">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
              <Code className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">代码注释生成器</h1>
              <p className="text-mutedForeground">自动为代码添加专业注释，提升可读性</p>
            </div>
          </div>

          <Card className="border-0 shadow-lg overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4">
              <div className="flex items-center gap-2 text-white/90">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/50"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="text-sm font-medium">AI 智能注释</span>
              </div>
            </div>
            
            <CardContent className="p-6 md:p-8">
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-mutedForeground">
                  选择语言
                </label>
                <div className="flex gap-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.value}
                      onClick={() => setLanguage(lang.value)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        language === lang.value
                          ? 'bg-green-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      disabled={isLoading}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-mutedForeground">
                  代码内容
                </label>
                <div className="relative">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="// 粘贴您的代码...\n\nfunction hello() {\n  console.log('Hello World');\n}"
                    className="w-full h-56 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-mono resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:border-transparent placeholder:text-gray-400"
                    disabled={isLoading}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {code.length} 字符
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
                onClick={handleGenerate}
                className="w-full h-12 text-base shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                disabled={isLoading || !code.trim()}
              >
                {isLoading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    生成中...
                  </>
                ) : (
                  <>生成注释</>
                )}
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card className="border-0 shadow-lg overflow-hidden">
              <CardHeader className="bg-gray-900 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-white/70 text-sm">带注释的代码</span>
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
                        复制代码
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="rounded-b-xl overflow-hidden border-b border-l border-r border-gray-200">
                  <SyntaxHighlighter
                    language={selectedLangMode}
                    style={oneDark}
                    customStyle={{
                      margin: 0,
                      padding: '20px',
                      background: '#1e293b',
                      fontSize: '14px',
                    }}
                    wrapLongLines
                  >
                    {result}
                  </SyntaxHighlighter>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-green-600 mb-1">2</div>
              <div className="text-sm text-mutedForeground">支持语言</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-emerald-600 mb-1">智能</div>
              <div className="text-sm text-mutedForeground">代码分析</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-teal-600 mb-1">清晰</div>
              <div className="text-sm text-mutedForeground">注释风格</div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-100 py-8 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl text-center text-sm text-mutedForeground">
          <p>AidKit - 代码注释工具</p>
        </div>
      </footer>
    </div>
  );
}
