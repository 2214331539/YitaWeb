import {
  MousePointer2,
  Waves,
  Pin,
  MessageCircle,
  SlidersHorizontal,
  KeyRound,
} from "lucide-react";

export const capabilities = [
  {
    icon: MousePointer2,
    title: "选中，就读懂",
    description:
      "在网页、文档或编辑器里拖选文字，译文出现在选区附近。阅读的地方，也是翻译的地方。",
  },
  {
    icon: Waves,
    title: "译文边来边读",
    description:
      "流式返回翻译结果，不必等整段结束。先读到的那一句，让理解先往前一步。",
  },
  {
    icon: Pin,
    title: "留住需要的那一段",
    description:
      "移动、缩放或固定阅读浮窗。保留这段译文，再去读下一段，思路不用来回切换。",
  },
  {
    icon: MessageCircle,
    title: "不止翻译，还能问问",
    description:
      "遇到难懂的术语、句子或代码，围绕当前内容继续解释和追问，让理解再深一点。",
  },
  {
    icon: SlidersHorizontal,
    title: "按你的节奏阅读",
    description:
      "中英文字体、字号、翻译方向和表达风格都由你决定，也支持个人术语与可选上下文。",
  },
  {
    icon: KeyRound,
    title: "自己的服务，自己的选择",
    description:
      "连接你选择的 API 服务，密钥交给系统凭据存储。普通翻译缓存留在内存，退出即清空。",
  },
];
export const steps = [
  {
    step: "01",
    title: "让 Yita 准备好",
    description:
      "安装后打开设置，填入服务地址、模型和 API Key。测试连接，保存设置。",
  },
  {
    step: "02",
    title: "选中想理解的文字",
    description:
      "在网页或可复制的 PDF 中拖选。也可以先复制，再用 Ctrl + Shift + T 翻译剪贴板。",
  },
  {
    step: "03",
    title: "继续往下读",
    description:
      "在原文旁读译文，随时切换原文、固定浮窗或继续追问。把注意力留给内容。",
  },
];
export const faqs = [
  {
    question: "Yita 支持哪些系统？",
    answer:
      "当前 0.9.0-preview.1 提供 Windows 10 1809+ / Windows 11 x64 安装包，以及 macOS 12+ 的 Apple Silicon（M 系列芯片）预览包。Mac 真实设备兼容性仍待验收；暂不提供 Intel Mac 或 Linux 版本。",
  },
  {
    question: "需要准备 API Key 吗？",
    answer:
      "需要。Yita 是免费开源的本地客户端，在线翻译使用你配置的 API 服务，默认接入 DeepSeek。首次使用请在设置中填写服务地址、模型和 API Key，API 调用费用由对应服务计费。",
  },
  {
    question: "我的原文会发送到哪里？",
    answer:
      "在线翻译时，选中文字会发送给你配置的 API 服务；启用上下文、术语或修正示例后，也可能附带相关内容。普通缓存不作永久历史保存，AI 问答记录的自动保存默认关闭。Windows 密钥保存在凭据管理器，Mac 使用 Keychain。",
  },
  {
    question: "网页、PDF、图片都能翻译吗？",
    answer:
      "支持可读取或可复制的文字，实际效果取决于目标应用与系统权限。当前没有 OCR，扫描 PDF、图片文字和禁止复制的内容不在支持范围内。划词无响应时，可以先复制文字，再按 Ctrl + Shift + T（Mac 为 Cmd + Shift + T）。",
  },
  {
    question: "预览版和旧版有什么区别？",
    answer:
      "0.9.0-preview.1 是当前 Avalonia 跨平台预览版；0.8.4 是保留下载的旧 WPF 版本。安装包自带运行时，无需预装 .NET。目前没有应用内自动更新，Windows 尚无商业代码签名，Mac 使用 ad-hoc 签名且未公证。首次安装请先阅读对应平台说明。",
  },
];
