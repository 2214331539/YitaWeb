// Adapted from CreatorHub CTA, originally TweakCN (Apache-2.0).
import { ArrowDown, ArrowUpRight, Monitor, Apple } from "lucide-react";
import { Reveal } from "../components/LandingMotion";
import { Button } from "./ui/button";
import { product } from "./product";

export function CTA() {
  return (
    <section
      id="download"
      className="landing-section landing-cta ch:w-full ch:py-20 ch:md:py-32 ch:bg-primary ch:text-primary-foreground ch:relative ch:overflow-hidden ch:isolate"
      aria-labelledby="cta-title"
    >
      <div className="landing-container ch:container ch:mx-auto ch:px-4 ch:md:px-6 ch:relative">
        <Reveal className="ch:flex ch:flex-col ch:items-center ch:justify-center ch:space-y-6 ch:text-center">
          <span className="section-kicker">A QUIETER WAY TO READ</span>
          <h2
            id="cta-title"
            className="ch:text-3xl ch:md:text-4xl ch:lg:text-5xl ch:font-bold"
          >
            下一段文字，轻松一点。
          </h2>
          <p className="ch:mx-auto ch:max-w-[700px] ch:text-primary-foreground/80 ch:md:text-xl">
            选一个适合你的版本，让 Yita 陪你往下读。
          </p>
          <a
            className="release-pill"
            href={product.release}
            target="_blank"
            rel="noreferrer"
          >
            v{product.version}
            <span>公开预览版</span>
            <ArrowUpRight size={14} />
          </a>
        </Reveal>
        <div className="download-grid">
          <Reveal className="download-card">
            <div className="download-card-title">
              <Monitor size={27} />
              <h3>Windows</h3>
              <span>x64</span>
            </div>
            <p>
              Windows 10 1809+ / Windows 11
              <br />
              自带运行时，安装后配置 API 即可使用。
            </p>
            <Button
              asChild
              size="lg"
              className="ch:w-full ch:h-12 ch:rounded-full"
            >
              <a href={product.downloads.windows}>
                下载 Windows 安装包
                <ArrowDown size={17} />
              </a>
            </Button>
            <a
              className="install-guide"
              href={product.windowsGuide}
              target="_blank"
              rel="noreferrer"
            >
              首次安装与使用说明
              <ArrowUpRight size={14} />
            </a>
          </Reveal>
          <Reveal delay={0.1} className="download-card">
            <div className="download-card-title">
              <Apple size={27} />
              <h3>macOS</h3>
              <span>Apple Silicon</span>
            </div>
            <p>
              macOS 12+ · M 系列芯片
              <br />
              Mac 预览包，真实设备兼容性仍待验收。
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="ch:w-full ch:h-12 ch:rounded-full ch:border-primary/30"
            >
              <a href={product.downloads.mac}>
                下载 Mac 预览版
                <ArrowDown size={17} />
              </a>
            </Button>
            <a
              className="install-guide"
              href={product.macGuide}
              target="_blank"
              rel="noreferrer"
            >
              权限设置与预览说明
              <ArrowUpRight size={14} />
            </a>
          </Reveal>
        </div>
        <p className="download-footnote">
          在线翻译需自备 API Key，调用费用由服务商计费。
          <br />
          Windows 包尚无商业代码签名；Mac 包未公证，请先阅读安装说明。
        </p>
        <div className="release-links">
          <a
            href={`${product.repository}/releases`}
            target="_blank"
            rel="noreferrer"
          >
            历史版本
          </a>
          <span>·</span>
          <a href={product.release} target="_blank" rel="noreferrer">
            更新记录与 SHA256 校验
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
