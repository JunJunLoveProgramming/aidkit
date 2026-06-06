import Link from 'next/link';
import { Languages, Code, FileText, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Navbar } from '@/src/components/Navbar';

const tools = [
  { id: 'translate', icon: Languages, title: '文本翻译', description: '支持中文、英文、日文互译', href: '/tools/translate', gradient: 'from-blue-500 to-cyan-500' },
  { id: 'code-comment', icon: Code, title: '代码注释', description: '自动为代码添加专业注释', href: '/tools/code-comment', gradient: 'from-green-500 to-emerald-500' },
  { id: 'summarize', icon: FileText, title: 'AI总结', description: '一键提炼文章精华', href: '/tools/summarize', gradient: 'from-purple-500 to-pink-500' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar currentPage="home" />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <section className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span></span>
              基于 DeepSeek AI 驱动
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">AidKit</span>
              <span className="block text-xl mt-2 text-gray-600 font-normal">智能助手，触手可及</span>
            </h1>
            <p className="text-mutedForeground max-w-xl mx-auto">强大的AI工具集，让翻译、代码注释和文本总结变得简单高效</p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {tools.map((tool) => (
              <Card key={tool.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-4`}>
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={tool.href}>
                    <Button variant="outline" className="w-full">开始使用<ArrowRight className="w-4 h-4 ml-2" /></Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="text-center">
            <div className="inline-flex items-center gap-8 px-8 py-4 rounded-2xl bg-white shadow-sm">
              <div><div className="text-2xl font-bold text-purple-600">3</div><div className="text-sm text-mutedForeground">AI工具</div></div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div><div className="text-2xl font-bold text-orange-600">流式</div><div className="text-sm text-mutedForeground">响应体验</div></div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div><div className="text-2xl font-bold text-green-600">免费</div><div className="text-sm text-mutedForeground">API调用</div></div>
            </div>
          </section>
        </div>
      </main>
      <footer className="border-t border-gray-100 py-8 px-4 text-center text-sm text-mutedForeground">
        <p>AidKit - 基于 Next.js + DeepSeek AI 构建</p>
      </footer>
    </div>
  );
}
