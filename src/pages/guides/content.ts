import { product } from "../home/product";

export type GuideSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  steps?: string[];
  questions?: { question: string; answer: string }[];
  link?: { label: string; href: string };
};

export type GuidePageContent = {
  file: string;
  label: string;
  title: string;
  heading: string;
  description: string;
  introduction: string;
  eyebrow: string;
  download?: { label: string; href: string; note: string };
  sections: GuideSection[];
};

export const guidePages: GuidePageContent[] = [
  {
    file: "windows.html",
    label: "Windows 使用指南",
    title: "Yita Windows 翻译工具｜免费下载与划词翻译使用指南",
    heading: "在 Windows 上，\n让翻译跟上阅读。",
    description:
      "免费下载 Yita Windows 划词翻译工具，支持 Windows 10 1809+ 与 Windows 11 x64。了解安装、API Key 配置、Ctrl+Shift+T 快捷键和 PDF 取词方法。软件免费，模型 API 可能另行计费。",
    introduction:
      "Yita 是免费开源的桌面翻译工具。阅读网页、论文或文档时，选中可以复制的文字，让译文出现在原文旁边。这里从安装开始，陪你完成第一次翻译。",
    eyebrow: "Yita for Windows",
    download: {
      label: "免费下载 Windows 版",
      href: product.downloads.windows,
      note: `v${product.version} · Windows 10 1809+ / 11 · x64`,
    },
    sections: [
      {
        id: "requirements",
        title: "开始之前",
        paragraphs: [
          "当前安装包适用于 Windows 10 1809 及以上版本、Windows 11，架构为 x64。安装包自带运行时，无需另行安装 .NET、SDK 或开发工具。",
          "软件免费下载、开源使用。翻译需要联网，并在设置中填写自己的模型 API Key；当前预览指南以 DeepSeek 为例，模型服务的调用费用由服务商收取。",
          "Yita 适合可以选中并复制的网页、编辑器、Office 文档和带文本层的 PDF。扫描件和图片目前不支持 OCR，实际取词效果也取决于目标软件。",
        ],
        link: { label: "了解免费范围与模型费用", href: "./faq.html#cost" },
      },
      {
        id: "installation",
        title: "安装与第一次配置",
        steps: [
          "退出正在运行的旧版 Yita，避免多个版本同时取词或占用快捷键。",
          "从上方按钮下载 Yita-Setup.exe，运行安装向导。默认安装到当前用户目录，通常无需管理员权限。当前预览包尚无商业代码签名，系统可能提示未知发布者；请核对下载来源为本项目 GitHub Release。",
          "从开始菜单或桌面的 Yita Preview 打开应用，进入设置页，填写模型 API Key、服务地址与模型，测试连接后保存。",
          "按需要启用自动划词与复制回退。在普通网页上选择一小段英文，尝试查看选区旁的译文。",
        ],
      },
      {
        id: "reading",
        title: "选中、翻译，接着读",
        paragraphs: [
          "自动划词开启后，拖选文字即可尝试取词。译文会逐步出现在阅读浮窗中；你可以切换原文与译文，移动、缩放或固定浮窗，再围绕选中的内容追问。",
          "自动取词失败时，先按 Ctrl+C 复制文字，再按 Ctrl+Shift+T，或使用托盘菜单中的“翻译剪贴板”。这个入口也适合不方便直接读取选区的软件。",
          "对 PDF，请先确认正文可以复制。WPS 与其他阅读器的选区接口不同，必要时尝试复制后翻译；图片型 PDF 需要先用其他工具识别文字。",
        ],
      },
      {
        id: "troubleshooting",
        title: "遇到问题时",
        questions: [
          {
            question: "选中文字后没有浮窗怎么办？",
            answer:
              "先检查自动划词是否开启、应用是否暂停，再用手动复制加 Ctrl+Shift+T 测试。若手动翻译可用，重点检查目标应用的选区与复制能力；若手动翻译也失败，回到模型设置检查 API Key、网络和测试连接结果。",
          },
          {
            question: "关闭设置窗口后，Yita 还在运行吗？",
            answer:
              "关闭设置窗口后，Yita 会留在系统托盘。通过托盘菜单可以重新打开设置、暂停划词或退出程序。",
          },
          {
            question: "怎样更新到新版本？",
            answer:
              "当前没有应用内自动更新。到官方 Release 下载新版 Setup，退出 Yita 后运行安装程序。旧 WPF 版与当前预览版可能并存，请只运行一个取词程序。",
          },
        ],
        link: {
          label: "查看完整 Windows 预览说明",
          href: product.windowsGuide,
        },
      },
    ],
  },
  {
    file: "mac.html",
    label: "Mac 使用指南",
    title: "Yita Mac 翻译工具｜Apple Silicon 免费下载与 macOS 使用指南",
    heading: "在 Mac 上，\n把理解留在手边。",
    description:
      "免费下载 Yita Mac 翻译工具预览版，面向 macOS 12+ Apple Silicon。了解 DMG 安装、辅助功能与输入监控权限、Cmd+Shift+T 剪贴板翻译。不支持 Intel Mac，模型 API 可能另行计费。",
    introduction:
      "Yita 把桌面划词翻译带到 Mac，让阅读外语内容时少一次切换。当前 Apple Silicon 版本处于预览测试阶段，使用前请先确认芯片、安装位置与系统权限。",
    eyebrow: "Yita for Mac · Preview",
    download: {
      label: "免费下载 Mac 预览版",
      href: product.downloads.mac,
      note: `v${product.version} · macOS 12+ · Apple Silicon`,
    },
    sections: [
      {
        id: "requirements",
        title: "先确认你的 Mac",
        paragraphs: [
          "当前仅支持 Apple Silicon，也就是 M 系列芯片的 Mac，不支持 Intel Mac。包元数据要求 macOS 12.0 及以上，实际兼容性仍需真机测试。",
          "应用自带运行时，无需额外安装 .NET、Xcode 或 Rosetta。翻译需要联网和自己的模型 API Key；软件免费，模型服务可能按用量收费。",
          "这是公开预览版，尚未完成所有真实设备与应用兼容性验收。取词能力受目标软件、系统权限以及文本是否允许复制影响，目前不支持图片 OCR。",
        ],
        link: { label: "了解软件与模型费用", href: "./faq.html#cost" },
      },
      {
        id: "installation",
        title: "安装到“应用程序”",
        steps: [
          "下载并打开 Yita.dmg，将 Yita.app 拖入 Applications（应用程序）。弹出磁盘镜像，再从“应用程序”启动 Yita，不要长期直接从 DMG 运行。",
          "当前试用包尚无 Apple Developer ID 签名和公证。如首次启动被系统阻止，确认文件来自本项目 Release 后，在“系统设置 → 隐私与安全性”中完成“仍要打开”的系统确认。无需关闭系统安全功能。",
          "进入 Yita 设置，填写模型 API Key、服务地址和模型，测试连接并保存。Key 保存在当前用户的 macOS Keychain；按系统实际提示处理钥匙串访问。",
        ],
      },
      {
        id: "permissions",
        title: "让 Yita 读到选中的文字",
        steps: [
          "在 Yita“常规”设置中申请或检查辅助功能与输入监控权限，通过应用提供的入口打开系统设置。",
          "授权系统实际显示的 Yita 或 Yita Native Helper 条目。若系统要求重启应用，从菜单退出，再重新打开已安装的 Yita。",
          "返回设置检查权限和输入捕获状态，启用自动划词。先在浏览器普通网页里选择一小段可复制文本测试。",
        ],
        paragraphs: [
          "模型连接成功和取词权限已授予是两个独立环节。如果系统要求手动添加原生组件，请按完整 Mac 预览说明中的路径操作。无需为了取词授予全磁盘访问权限。",
        ],
        link: { label: "查看完整 Mac 权限与安装说明", href: product.macGuide },
      },
      {
        id: "troubleshooting",
        title: "从一次手动翻译开始排查",
        questions: [
          {
            question: "应用已打开，为什么 Dock 中没有图标？",
            answer:
              "Yita 是菜单栏常驻应用，默认不显示 Dock 图标。通过菜单栏打开设置；如果“应用程序”中找不到 Yita，请先确认已从 DMG 将 Yita.app 拖入 Applications。",
          },
          {
            question: "Mac 划词没有反应怎么办？",
            answer:
              "先复制一段文字，使用菜单中的“翻译剪贴板”，也可以尝试 Cmd+Shift+T。若能翻译，检查辅助功能、输入监控和自动取词状态；若不能翻译，检查模型设置、Keychain 与连接结果。",
          },
          {
            question: "如何更新与反馈预览问题？",
            answer:
              "当前没有自动更新。退出 Yita 后，用新包替换“应用程序”中的应用。反馈时附上芯片、macOS 版本、目标应用及复现步骤，可附菜单中的性能诊断；不要提交 API Key 或私人文档正文。",
          },
        ],
      },
    ],
  },
  {
    file: "faq.html",
    label: "免费使用与常见问题",
    title: "Yita 免费翻译工具常见问题｜API 费用、划词翻译与隐私说明",
    heading: "开始之前，\n把几个问题说清楚。",
    description:
      "Yita 是免费开源的 Windows 与 Mac 桌面翻译工具。了解软件免费范围、模型 API 费用、划词和 PDF 翻译限制、联网要求及数据去向，再选择适合自己的使用方式。",
    introduction:
      "轻巧，也意味着把事情说清楚。软件如何免费使用、为什么需要模型 API Key、哪些文字可以翻译，都在这里。",
    eyebrow: "About Yita · Questions & answers",
    sections: [
      {
        id: "about",
        title: "Yita 是什么翻译工具？",
        paragraphs: [
          "Yita 是免费开源的桌面划词翻译工具。选中可以复制的外语文字后，它通过你配置的模型服务取得译文，在原文附近显示阅读浮窗。你可以对照原文、固定浮窗，或继续追问一句话的意思。",
          "它面向阅读网页、技术文档、论文和可复制 PDF 的场景。Windows 提供 x64 安装包，Mac 提供 Apple Silicon 预览包；两端均可从官网免费下载。",
        ],
      },
      {
        id: "cost",
        title: "软件免费，模型服务按自己的方案选择",
        questions: [
          {
            question: "Yita 是免费翻译工具吗？",
            answer:
              "Yita 软件本身可以免费下载和使用，应用源码以 MIT 许可证公开。它不包含免费无限量的模型 API 服务；翻译所用模型的费用、额度与可用性由你选择的服务商决定。",
          },
          {
            question: "为什么还要填写 API Key？",
            answer:
              "Yita 负责取词、展示译文和阅读交互，翻译内容通过你配置的模型 API 处理。当前预览指南以 DeepSeek 为例，需要在服务商处取得自己的 API Key，再在 Yita 设置中配置服务地址与模型、测试连接并保存。",
          },
          {
            question: "Yita 能离线翻译吗？",
            answer:
              "当前官方预览指南使用联网模型服务，安装包不附带离线翻译模型。软件可以免费安装，但实际翻译需要可用的模型连接。",
          },
        ],
      },
      {
        id: "selection",
        title: "哪些内容可以翻译？",
        questions: [
          {
            question: "划词翻译与复制翻译有什么区别？",
            answer:
              "划词翻译会尝试自动读取你拖选的文本，并在附近显示浮窗。复制翻译使用剪贴板中的文字：先手动复制，再使用 Windows 的 Ctrl+Shift+T、Mac 的 Cmd+Shift+T，或菜单中的“翻译剪贴板”。自动取词失败时，可以用后者判断问题发生在取词还是模型连接环节。",
          },
          {
            question: "能翻译 PDF、图片或扫描件吗？",
            answer:
              "带有可复制文本层的 PDF 可以尝试划词或复制翻译，实际效果取决于阅读器。Yita 当前不提供图片 OCR；截图、扫描件和图片型 PDF 需要先使用其他工具识别文字。",
          },
          {
            question: "能在所有软件里划词吗？",
            answer:
              "不能保证。取词依赖目标软件的选区接口、复制能力和系统权限。密码框、受保护内容、禁止复制的文字或不暴露选区的控件可能无法读取。",
          },
        ],
      },
      {
        id: "privacy",
        title: "文字会去哪里？",
        paragraphs: [
          "使用联网翻译时，待翻译的文字以及你启用的相关上下文会发送给设置中配置的模型服务；对这些数据的处理也受该服务商的政策约束。使用前，请确认内容适合发送给所选服务。",
          "API Key 保存在当前用户的系统凭据设施中，Mac 使用 Keychain。普通翻译缓存不作为永久历史保存；解释与问答的 AI 记录可以按设置保存。具体行为以对应版本的源码和配置说明为准。",
          "这个官网提供下载和使用说明，不接收你的 API Key，也不在网页上处理翻译内容。报告问题时，请去除密钥和私人文档正文。",
        ],
        link: {
          label: "阅读项目的配置与隐私说明",
          href: `${product.repository}#配置与隐私`,
        },
      },
      {
        id: "open-source",
        title: "一起把这个小工具做好",
        paragraphs: [
          "Yita 仍在持续打磨。可以在 GitHub 查看应用源码、阅读版本说明、报告问题或参与贡献。关于某个软件无法取词的反馈，请提供系统版本、目标软件版本和可重复的操作步骤。",
        ],
        link: { label: "查看 Yita 开源项目", href: product.repository },
      },
    ],
  },
];
