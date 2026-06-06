import { Navbar } from '@/src/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Code, Languages, FileText, Github, Heart, Mail } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    icon: Languages,
    title: '智能翻译',
    description: '基于DeepSeek大模型，支持多语言互译，翻译结果准确流畅',
  },
  {
    icon: Code,
    title: '代码注释',
    description: '自动为代码添加专业注释，提升团队协作效率和代码可维护性',
  },
  {
    icon: FileText,
    title: '文本总结',
    description: '快速提炼长文本核心要点，节省阅读时间，提高信息获取效率',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar currentPage="about" />

      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <section className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">关于 AidKit</h1>
            <p className="text-lg text-mutedForeground">
              AidKit 是一个基于 Next.js 和 DeepSeek AI 构建的智能工具集
            </p>
          </section>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">项目介绍</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                AidKit 是一个开源的AI工具集合，旨在帮助开发者和普通用户更高效地完成日常工作。
                我们集成了 DeepSeek 强大的AI能力，提供翻译、代码注释生成和文本总结等实用功能。
              </p>
            </CardContent>
          </Card>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">功能特性</h2>
            <div className="grid gap-4">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-mutedForeground">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">技术栈</h2>
            <Card>
              <CardContent className="space-y-2 text-sm text-mutedForeground">
                <div className="flex justify-between py-2 border-b border-border">
                  <span>项目版本</span>
                  <span className="font-medium">v0.1.0</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span>框架</span>
                  <span className="font-medium">Next.js 14 (App Router)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span>语言</span>
                  <span className="font-medium">TypeScript</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span>样式</span>
                  <span className="font-medium">TailwindCSS + shadcn/ui</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span>AI能力</span>
                  <span className="font-medium">Vercel AI SDK + DeepSeek</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>部署</span>
                  <span className="font-medium">Vercel</span>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">作者信息</h2>
            <Card>
              <CardContent className="space-y-4 py-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/30 flex items-center justify-center shrink-0">
                    <Image
                      src="/auther.png"
                      alt="骏骏爱编程"
                      width={56}
                      height={56}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">骏骏爱编程</h3>
                    <p className="text-sm text-mutedForeground">作者 & 开发者</p>
                  </div>
                </div>
                <div className="space-y-3 pt-2 border-t border-border">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-mutedForeground" />
                    <a
                      href="mailto:junjunloveprogramming@junjunloveprogramming.cn"
                      className="text-primary hover:underline"
                    >
                      junjunloveprogramming@junjunloveprogramming.cn
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Github className="w-4 h-4 text-mutedForeground" />
                    <a
                      href="https://github.com/JunJunLoveProgramming/aidkit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      github.com/JunJunLoveProgramming/aidkit
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-0">
            <CardContent className="text-center py-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="font-medium">用爱构建</span>
              </div>
              <p className="text-sm text-mutedForeground">
                这个项目是开源的，欢迎在 GitHub 上贡献代码或提出建议
              </p>
              <div className="mt-4 flex justify-center">
                <a
                  href="https://github.com/JunJunLoveProgramming/aidkit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primaryForeground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  查看源码
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center text-sm text-mutedForeground">
          <p>AidKit v0.1.0 · 由 骏骏爱编程 创建</p>
          <p className="mt-1">基于 Next.js + DeepSeek AI 构建</p>
        </div>
      </footer>
    </div>
  );
}
