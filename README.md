# AidKit

> 当前版本：**v0.1.0**

强大的AI工具集，基于 Next.js + DeepSeek AI 构建

## 功能特性

- **文本翻译**：支持中文、英文、日文互译，流式响应体验
- **代码注释生成器**：自动为 JavaScript/Python 代码添加专业注释
- **AI总结器**：一键提炼长文本核心要点，生成3个要点+简评

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: TailwindCSS 3 + shadcn/ui
- **AI能力**: DeepSeek API
- **代码高亮**: react-syntax-highlighter
- **图标**: lucide-react

## 快速开始

### 环境要求

- Node.js >= 18.17.0
- npm >= 9.6.7

### 安装依赖

```bash
npm install
```

### 配置环境变量

#### 方式一：网页设置（推荐）

1. 启动项目后，访问 http://localhost:3001/settings
2. 在设置页面输入你的 DeepSeek API Key
3. 点击"保存"按钮
4. 点击"测试连接"验证 API Key 是否有效

**优点：**
- 无需修改配置文件
- API Key 存储在浏览器本地，更安全
- 可随时更换 API Key

#### 方式二：环境变量配置

在项目根目录创建或编辑 `.env.local` 文件：

```env
# .env.local
DEEPSEEK_API_KEY=sk-your-actual-api-key-here
```

**获取 DeepSeek API Key：**
1. 访问 [DeepSeek AI 平台](https://platform.deepseek.com/)
2. 注册账号并登录
3. 在左侧导航栏点击"API Keys"
4. 点击"Create New Key"创建新的 API Key
5. 复制生成的 Key（以 `sk-` 开头）

#### API 配置说明

| 配置项 | 说明 |
|--------|------|
| `DEEPSEEK_API_KEY` | DeepSeek API 密钥，可通过设置页面或环境变量配置 |
| API 地址 | `https://api.deepseek.com/v1`（已在代码中配置） |
| 模型 | `deepseek-chat`（已在代码中配置） |

**配置优先级：** 网页设置 > 环境变量

**注意：** 修改 `.env.local` 后必须重启开发服务器才能生效！

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000 查看应用

### 生产构建

```bash
npm run build
npm start
```

### 代码检查

```bash
npm run lint
```

## 项目结构

```
aidkit/
├── app/
│   ├── api/                    # API路由
│   │   ├── translate/route.ts  # 翻译API
│   │   ├── code-comment/route.ts  # 代码注释API
│   │   └── summarize/route.ts  # 总结API
│   ├── tools/                  # 工具页面
│   │   ├── translate/page.tsx  # 翻译工具
│   │   ├── code-comment/page.tsx  # 代码注释工具
│   │   └── summarize/page.tsx  # 总结工具
│   ├── about/                  # 关于页面
│   ├── layout.tsx              # 根布局
│   ├── head.tsx                # 页面头部
│   └── page.tsx                # 首页
├── src/
│   ├── components/
│   │   ├── ui/                 # shadcn/ui组件
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Input.tsx
│   │   └── Navbar.tsx          # 导航栏组件
│   ├── lib/
│   │   ├── ai.ts               # AI工具函数
│   │   └── utils.ts            # 工具函数
│   └── index.css               # 全局样式
├── .env.local                  # 环境变量
├── package.json
├── tailwind.config.js          # TailwindCSS配置
├── tsconfig.json               # TypeScript配置
└── next.config.js              # Next.js配置
```

## 使用说明

### 文本翻译
1. 选择源语言和目标语言
2. 输入要翻译的文本
3. 点击"翻译"按钮，等待流式结果

### 代码注释生成器
1. 选择编程语言（JavaScript/Python）
2. 输入代码
3. 点击"生成注释"按钮

### AI总结器
1. 输入长文本（最多2000字）
2. 点击"生成总结"按钮
3. 查看3个核心要点和简短评论

## 部署

### Vercel 部署

1. 安装 Vercel CLI：
   ```bash
   npm install -g vercel
   ```

2. 登录并部署：
   ```bash
   vercel login
   vercel
   ```

3. 在 Vercel 控制台设置环境变量 `DEEPSEEK_API_KEY`

## 许可证

MIT License

## 作者

- **作者**: 骏骏爱编程
- **邮箱**: junjunloveprogramming@junjunloveprogramming.cn
- **GitHub**: [https://github.com/JunJunLoveProgramming/aidkit](https://github.com/JunJunLoveProgramming/aidkit)

## 贡献

欢迎提交 Issue 和 Pull Request！
