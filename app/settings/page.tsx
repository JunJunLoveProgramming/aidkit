'use client';

import { useState, useEffect } from 'react';
import { Settings, Key, Check, AlertCircle, Eye, EyeOff, Trash2 } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Navbar } from '@/src/components/Navbar';

const STORAGE_KEY = 'deepseek_api_key';

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  // 页面加载时从 localStorage 读取已保存的 API Key
  useEffect(() => {
    const savedKey = localStorage.getItem(STORAGE_KEY);
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  // 保存 API Key 到 localStorage
  const handleSave = () => {
    if (!apiKey.trim()) {
      setError('请输入 API Key');
      return;
    }

    if (!apiKey.startsWith('sk-')) {
      setError('API Key 格式不正确，应以 sk- 开头');
      return;
    }

    localStorage.setItem(STORAGE_KEY, apiKey.trim());
    setSaved(true);
    setError('');
    setTimeout(() => setSaved(false), 3000);
  };

  // 清除已保存的 API Key
  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setApiKey('');
    setSaved(false);
    setError('');
  };

  // 测试 API Key 是否有效
  const handleTest = async () => {
    if (!apiKey.trim()) {
      setError('请先输入 API Key');
      return;
    }

    setError('');
    setSaved(false);

    try {
      const response = await fetch('/api/test-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: apiKey.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError(data.error || 'API Key 无效');
      }
    } catch {
      setError('测试失败，请检查网络连接');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar currentPage="settings" />

      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* 页面标题 */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center shadow-lg">
              <Settings className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">设置</h1>
              <p className="text-mutedForeground">配置你的 DeepSeek API Key</p>
            </div>
          </div>

          {/* API Key 配置卡片 */}
          <Card className="border-0 shadow-lg mb-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Key className="w-5 h-5 text-purple-500" />
                <CardTitle>DeepSeek API Key</CardTitle>
              </div>
              <CardDescription>
                API Key 用于调用 DeepSeek AI 服务，将存储在浏览器本地
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 输入框 */}
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full h-12 px-4 pr-12 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* 状态提示 */}
              {saved && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700">
                  <Check className="w-5 h-5" />
                  <span className="text-sm">API Key 已保存</span>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* 操作按钮 */}
              <div className="flex gap-3">
                <Button onClick={handleSave} className="flex-1">
                  保存
                </Button>
                <Button variant="outline" onClick={handleTest}>
                  测试连接
                </Button>
                <Button variant="ghost" onClick={handleClear} className="text-red-500 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 说明卡片 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">如何获取 API Key</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-mutedForeground">
              <p>1. 访问 <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">DeepSeek AI 平台</a></p>
              <p>2. 注册账号并登录</p>
              <p>3. 在左侧导航栏点击"API Keys"</p>
              <p>4. 点击"Create New Key"创建新的 API Key</p>
              <p>5. 复制生成的 Key（以 sk- 开头）并粘贴到上方输入框</p>
              <div className="mt-4 p-3 bg-yellow-50 rounded-xl border border-yellow-200 text-yellow-700">
                <p className="font-medium">⚠️ 安全提示</p>
                <p className="mt-1">API Key 存储在浏览器本地，不会上传到服务器。请勿在公共电脑上保存 API Key。</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t border-gray-100 py-8 px-4 text-center text-sm text-mutedForeground">
        <p>AidKit - 设置页面</p>
      </footer>
    </div>
  );
}