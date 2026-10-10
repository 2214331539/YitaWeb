/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. See /licenses/Thunderbird-MPL-2.0.txt.
 * Adapted from thunderbird-website/sites/www.thunderbird.net/index.html
 * and includes/base/page.html, revision 9abcd60. Yita content and interactions.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Code2,
  Download,
  Heart,
  Languages,
  MessageCircle,
  MousePointer2,
  Pin,
  Settings2,
  X,
  ZoomIn,
} from "lucide-react";
import { product } from "./home/product";

const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`;
const hasDesktopHover = () =>
  window.matchMedia("(min-width: 1025px) and (hover: hover)").matches;
const shots = [
  {
    file: "reading.png",
    title: "读懂一段话",
    description: "选中论文段落，译文就在原文旁边。",
  },
  {
    file: "phrase.png",
    title: "理解一句话",
    description: "从一个标题开始，不必离开正在阅读的页面。",
  },
  {
    file: "settings.png",
    title: "按习惯设置",
    description: "调整触发方式、翻译外观和模型连接。",
  },
] as const;

function WindowsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2 4.1 10.4 3v8.1H2zm9.4-1.2L22 1.5v9.6H11.4zM2 12.1h8.4v8.1L2 19.1zm9.4 0H22v9.6l-10.6-1.4z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 12.54c.02 3.1 2.72 4.13 2.75 4.14-.02.07-.43 1.48-1.42 2.94-.85 1.26-1.74 2.51-3.13 2.54-1.37.03-1.82-.82-3.39-.82-1.56 0-2.05.8-3.34.85-1.34.05-2.37-1.36-3.23-2.61-1.76-2.56-3.1-7.25-1.29-10.42.9-1.57 2.5-2.56 4.24-2.59 1.33-.03 2.58.9 3.39.9.81 0 2.33-1.11 3.93-.95.67.03 2.55.27 3.75 2.03-.1.06-2.23 1.3-2.21 3.99ZM14.48 4.84c.71-.86 1.19-2.04 1.06-3.22-1.02.04-2.25.68-2.98 1.54-.65.75-1.23 1.95-1.08 3.1 1.13.09 2.28-.58 3-1.42Z" />
    </svg>
  );
}

function Github({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .8a11.3 11.3 0 0 0-3.57 22.02c.56.1.77-.24.77-.54v-2.1c-3.15.68-3.81-1.33-3.81-1.33-.51-1.3-1.26-1.65-1.26-1.65-1.03-.71.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.51-.29-5.15-1.26-5.15-5.59 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.99 0 0 .95-.3 3.1 1.16a10.8 10.8 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.62 1.56.23 2.71.12 2.99.72.79 1.15 1.8 1.15 3.03 0 4.34-2.64 5.3-5.16 5.58.4.35.77 1.04.77 2.09v3.09c0 .3.2.65.78.54A11.3 11.3 0 0 0 12 .8Z" />
    </svg>
  );
}

function Mask() {
  return (
    <div className="mask" aria-hidden="true">
      <svg viewBox="0 0 1920 75" fill="none">
        <path d="M0 0L960 56.7241L1920 0V75H0V0Z" fill="currentColor" />
      </svg>
    </div>
  );
}

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`logo yita-logo${footer ? " footer-logo" : ""}`}
      href="#top"
      aria-label="Yita 首页"
    >
      <img src={asset("yita-icon-128.png")} width="52" height="52" alt="" />
      <span>Yita</span>
    </a>
  );
}

function PlatformList() {
  return (
    <div className="os-list" aria-label="支持 Windows 与 Apple Silicon Mac">
      <span className="icon" title="Windows">
        <WindowsIcon />
      </span>
      <span className="icon icon-apple" title="Apple Silicon Mac">
        <AppleIcon />
      </span>
    </div>
  );
}

function DownloadLinks() {
  return (
    <div className="platform-downloads">
      <a href={product.downloads.windows} className="platform-download">
        <WindowsIcon />
        <span>
          <strong>Windows</strong>
          <small>Windows 10 / 11 · x64 · .exe</small>
        </span>
        <Download size={20} />
      </a>
      <a href={product.downloads.mac} className="platform-download">
        <AppleIcon />
        <span>
          <strong>macOS</strong>
          <small>macOS 12+ · Apple Silicon · .dmg</small>
        </span>
        <Download size={20} />
      </a>
    </div>
  );
}

function Navigation({ onDownload }: { onDownload: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || document.querySelector("dialog[open]"))
        return;
      setOpenGroup(null);
      setExpanded(false);
      if (navRef.current?.contains(document.activeElement)) {
        if (window.matchMedia("(max-width: 1024px)").matches) {
          triggerRef.current?.focus();
        } else {
          document.activeElement
            ?.closest(".nav-entry")
            ?.querySelector<HTMLButtonElement>(".nav-ln")
            ?.focus();
        }
      }
    };
    const onOutside = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setExpanded(false);
        setOpenGroup(null);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
    };
  }, []);
  const close = () => {
    setExpanded(false);
    setOpenGroup(null);
  };
  const menus: {
    name: string;
    id: string;
    links: { label: string; detail: string; href: string; icon: ReactNode }[];
  }[] = [
    {
      name: "产品",
      id: "product",
      links: [
        {
          label: "认识 Yita",
          detail: "让翻译留在阅读发生的地方",
          href: "#free-from-chaos",
          icon: <Languages />,
        },
        {
          label: "功能与体验",
          detail: "从划词到追问，自然地接下去",
          href: "#free-to-geek",
          icon: <MousePointer2 />,
        },
      ],
    },
    {
      name: "使用指南",
      id: "resources",
      links: [
        {
          label: "Windows 入门",
          detail: "安装、配置与第一次翻译",
          href: product.windowsGuide,
          icon: <BookOpen />,
        },
        {
          label: "Mac 预览指南",
          detail: "Apple Silicon 预览版说明",
          href: product.macGuide,
          icon: <BookOpen />,
        },
      ],
    },
    {
      name: "参与项目",
      id: "contribute",
      links: [
        {
          label: "查看源代码",
          detail: "到 GitHub 一起打磨 Yita",
          href: product.repository,
          icon: <Code2 />,
        },
        {
          label: "反馈与建议",
          detail: "让下一次使用更顺手",
          href: product.issues,
          icon: <MessageCircle />,
        },
      ],
    },
  ];
  return (
    <>
      <div className="brand-tabs">
        <div>
          <a href="#top" className="active">
            Yita
          </a>
          <a href={product.repository}>
            GitHub <ArrowRight size={12} />
          </a>
        </div>
      </div>
      <nav
        ref={navRef}
        className={`site-nav ${scrolled ? "scrolled-nav" : ""}`}
        aria-label="主要导航"
      >
        <div className="nav-container">
          <Brand />
          <button
            ref={triggerRef}
            className="hamburger-btn"
            aria-expanded={expanded}
            aria-controls="site-navigation"
            aria-label={expanded ? "关闭导航" : "打开导航"}
            onClick={() => setExpanded(!expanded)}
          >
            <span className="hamburger-icon">
              <span />
              <span />
              <span />
            </span>
          </button>
          <ul
            id="site-navigation"
            className={`nav-links ${expanded ? "expanded" : ""}`}
          >
            {menus.map((menu) => (
              <li
                key={menu.id}
                className="nav-entry"
                onMouseEnter={() => {
                  if (hasDesktopHover()) setOpenGroup(menu.id);
                }}
                onMouseLeave={() => {
                  if (hasDesktopHover()) setOpenGroup(null);
                }}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget))
                    setOpenGroup(null);
                }}
              >
                <button
                  className="nav-ln"
                  aria-expanded={openGroup === menu.id}
                  aria-controls={`menu-${menu.id}`}
                  onClick={(event) => {
                    if (event.detail > 0 && hasDesktopHover())
                      setOpenGroup(menu.id);
                    else setOpenGroup(openGroup === menu.id ? null : menu.id);
                  }}
                >
                  {menu.name}
                  <ChevronDown size={12} />
                </button>
                <div
                  id={`menu-${menu.id}`}
                  className="popover-container"
                  hidden={openGroup !== menu.id}
                >
                  <ul className="popover-panel">
                    {menu.links.map((link) => (
                      <li key={link.label} className="entry-container">
                        <a href={link.href} onClick={close}>
                          <span className="entry-icon">{link.icon}</span>
                          <span className="entry-text">
                            <span className="entry-title">{link.label}</span>
                            <span className="entry-detail">{link.detail}</span>
                          </span>
                          <ArrowRight size={16} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
            <li className="nav-entry nav-button-fix">
              <button
                className="btn nav-download"
                onClick={() => {
                  close();
                  onDownload();
                }}
              >
                <Download size={16} /> 下载 Yita
              </button>
            </li>
            <li className="nav-entry">
              <a className="nav-support" href={product.repository}>
                <Heart size={16} /> 支持开源
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

function HeroDownload({ onDownload }: { onDownload: () => void }) {
  const [platform, setPlatform] = useState<"windows" | "mac" | null>(null);
  useEffect(() => {
    const agent = navigator.userAgent;
    if (/Windows NT/i.test(agent)) setPlatform("windows");
    else if (/Macintosh/i.test(agent)) setPlatform("mac");
  }, []);
  return (
    <div className="hero-download">
      <PlatformList />
      <button className="download-options" onClick={onDownload}>
        所有下载选项 <ChevronDown size={12} />
      </button>
      {platform ? (
        <a
          className="btn btn-gradient download-primary"
          href={product.downloads[platform]}
        >
          <Download size={19} /> 下载{" "}
          {platform === "windows" ? "Windows 版" : "Mac 版 · Apple Silicon"}
        </a>
      ) : (
        <a
          className="btn btn-gradient download-primary"
          href={product.release}
          onClick={(event) => {
            event.preventDefault();
            onDownload();
          }}
        >
          <Download size={19} /> 下载 Yita
        </a>
      )}
      <p className="download-note">
        免费开源 <span>·</span> <a href={product.release}>v{product.version}</a>
      </p>
    </div>
  );
}

function HeroArtwork() {
  const artworkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const artwork = artworkRef.current;
    const hero = artwork?.closest<HTMLElement>("#masthead");
    if (!artwork || !hero) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let scrollStart = 0;
    let scrollRange = 1;
    let progress = 0;
    let target = 0;
    let frame = 0;
    let previousTime = 0;

    const getProgress = () => {
      if (reducedMotion.matches) return 0;
      const value = Math.min(
        1,
        Math.max(0, (window.scrollY - scrollStart) / scrollRange),
      );
      return value * value * (3 - 2 * value);
    };
    const paint = () =>
      artwork.style.setProperty("--hero-progress", progress.toFixed(5));
    const animate = (time: number) => {
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16;
      previousTime = time;
      progress += (target - progress) * (1 - Math.exp(-elapsed / 80));
      if (Math.abs(target - progress) < 0.0001) {
        progress = target;
        frame = 0;
        previousTime = 0;
      } else {
        frame = requestAnimationFrame(animate);
      }
      paint();
    };
    const onScroll = () => {
      target = getProgress();
      if (!frame && Math.abs(target - progress) >= 0.0001) {
        frame = requestAnimationFrame(animate);
      }
    };
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      scrollStart = hero.getBoundingClientRect().top + window.scrollY;
      scrollRange = Math.max(
        1,
        Math.min(hero.offsetHeight * 0.58, window.innerHeight * 0.72),
      );
      progress = target = getProgress();
      paint();
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(hero);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    reducedMotion.addEventListener("change", measure);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      reducedMotion.removeEventListener("change", measure);
      artwork.style.removeProperty("--hero-progress");
    };
  }, []);

  return (
    <div ref={artworkRef} className="hero-artwork" aria-hidden="true">
      <div className="hero-halo" />
      <img
        className="hero-screen hero-screen-left"
        src={asset("screenshots/phrase.png")}
        width="850"
        height="498"
        alt=""
      />
      <img
        className="hero-screen hero-screen-right"
        src={asset("screenshots/reading.png")}
        width="1012"
        height="627"
        alt=""
      />
      <img
        className="hero-screen hero-screen-center"
        src={asset("screenshots/settings.png")}
        width="966"
        height="753"
        alt=""
        fetchPriority="high"
      />
    </div>
  );
}

function LaptopShowcase({
  onZoom,
}: {
  onZoom: (file: string, title: string) => void;
}) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  function selectTab(index: number) {
    setActive(index);
    tabRefs.current[index]?.focus();
  }
  return (
    <>
      <div className="devices-container" data-reveal>
        <div className="graphic">
          <img
            className="laptop-frame"
            src={asset("laptop-frame.webp")}
            width="2240"
            height="1260"
            alt=""
            loading="lazy"
          />
          <div className="carousel">
            {shots.map((shot, index) => (
              <div
                key={shot.file}
                id={`showcase-${index}`}
                role="tabpanel"
                aria-labelledby={`showcase-tab-${index}`}
                hidden={active !== index}
                className="screen-slide"
              >
                <button
                  className="screenshot-zoom"
                  onClick={() => onZoom(shot.file, shot.title)}
                  aria-label={`放大查看：${shot.title}`}
                >
                  <img
                    src={asset(`screenshots/${shot.file}`)}
                    alt={shot.description}
                    loading="lazy"
                  />
                  <span className="zoom-hint">
                    <ZoomIn size={16} /> 查看原图
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="TfA-overlay yita-floating-window" aria-hidden="true">
          <div className="phrase-crop">
            <img
              src={asset("screenshots/phrase.png")}
              width="850"
              height="498"
              alt=""
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div className="showcase-tabs" role="tablist" aria-label="产品截图">
        {shots.map((shot, index) => (
          <button
            key={shot.file}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            role="tab"
            id={`showcase-tab-${index}`}
            aria-controls={`showcase-${index}`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                selectTab((index + 1) % shots.length);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                selectTab((index + shots.length - 1) % shots.length);
              }
              if (event.key === "Home") {
                event.preventDefault();
                selectTab(0);
              }
              if (event.key === "End") {
                event.preventDefault();
                selectTab(shots.length - 1);
              }
            }}
          >
            {shot.title}
          </button>
        ))}
      </div>
    </>
  );
}

function FeatureCards() {
  return (
    <div className="testimonials">
      <article className="testimonial-card card-lg" data-reveal>
        <div className="quote">
          <MousePointer2 />
          <h3>
            选中，
            <br />
            就读懂。
          </h3>
          <p>一段论文、一句外语，译文出现在原文旁边。理解之后，接着往下读。</p>
          <span className="feature-caption">划词翻译</span>
        </div>
        <div className="visual unified-inbox">
          <img
            src={asset("screenshots/phrase.png")}
            width="850"
            height="498"
            alt="Yita 在论文标题旁显示中文译文"
            loading="lazy"
          />
        </div>
      </article>
      <article className="testimonial-card" data-reveal>
        <div className="quote">
          <MessageCircle />
          <h3>再问一句</h3>
          <p>遇到没理解的概念，在翻译浮窗中继续提问。</p>
          <span className="feature-caption">从翻译到理解</span>
        </div>
      </article>
      <article className="testimonial-card" data-reveal>
        <div className="quote">
          <Pin />
          <h3>留在手边</h3>
          <p>把需要的译文固定下来，边读原文，边做对照。</p>
          <span className="feature-caption">浮窗置顶</span>
        </div>
      </article>
      <article className="testimonial-card" data-reveal>
        <div className="quote">
          <Languages />
          <h3>自由对照</h3>
          <p>轻点「原文 / 译文」，在两种表达之间切换。</p>
          <span className="feature-caption">原译文切换</span>
        </div>
      </article>
      <article className="testimonial-card" data-reveal>
        <div className="quote">
          <Settings2 />
          <h3>顺着你的习惯</h3>
          <p>调整触发等待、选区大小，以及应用的外观。</p>
          <span className="feature-caption">可调节的体验</span>
        </div>
      </article>
      <article className="testimonial-card card-lg" data-reveal>
        <div className="quote">
          <Code2 />
          <h3>
            用你选择的
            <br />
            翻译模型。
          </h3>
          <p>填入自己的 API Key，配置服务连接。从熟悉的模型开始。</p>
          <span className="feature-caption">默认支持 DeepSeek</span>
        </div>
        <div className="visual extensions">
          <img
            src={asset("screenshots/settings.png")}
            width="966"
            height="753"
            alt="Yita 设置，包含常规、翻译与外观、模型配置"
            loading="lazy"
          />
        </div>
      </article>
    </div>
  );
}

export default function ThunderbirdLanding() {
  const downloadDialog = useRef<HTMLDialogElement>(null);
  const imageDialog = useRef<HTMLDialogElement>(null);
  const [zoom, setZoom] = useState({
    file: "reading.png",
    title: "Yita 产品界面",
  });
  const showDownloads = () => downloadDialog.current?.showModal();
  const showImage = (file: string, title: string) => {
    setZoom({ file, title });
    imageDialog.current?.showModal();
  };
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    nodes.forEach((node) => {
      node.classList.add("reveal-ready");
      observer.observe(node);
    });
    return () => {
      observer.disconnect();
      nodes.forEach((node) => node.classList.remove("reveal-ready"));
    };
  }, []);
  return (
    <>
      <a href="#main-content" className="skip-link">
        跳到主要内容
      </a>
      <div id="top" />
      <Navigation onDownload={showDownloads} />
      <header id="masthead">
        <section className="hero-content" aria-label="认识 Yita">
          <div className="container hero">
            <div className="hero-text">
              <h1 className="tagline">
                让翻译，<span className="txt-gradient">再轻一点。</span>
              </h1>
              <p className="sub-tag">
                认识 Yita，你的<strong>轻巧桌面翻译伙伴</strong>。<br />
                选中文字，就在原文旁边读到译文。
              </p>
            </div>
            <HeroDownload onDownload={showDownloads} />
          </div>
        </section>
        <HeroArtwork />
        <Mask />
      </header>
      <main id="main-content">
        <section id="free-from-chaos">
          <div className="container">
            <div className="floating-icons" aria-hidden="true">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className={`blank-icon box-${i + 1}`} />
              ))}
              <span className="competitor-icon apple floating-symbol">Aa</span>
              <span className="competitor-icon outlook floating-symbol">
                文
              </span>
              <span className="competitor-icon proton floating-symbol">
                <BookOpen />
              </span>
            </div>
            <div className="section-text" data-reveal>
              <h2 className="section-heading">
                少一点切换，<span className="txt-gradient">多一点专注。</span>
              </h2>
              <h4>阅读到哪里，翻译就在哪里。</h4>
              <p>
                不用在原文和翻译网页之间来回往返。选中能复制的文字，让 Yita
                在旁边展开译文。一句标题，或一整段论文，都沿着原来的阅读节奏。
              </p>
            </div>
            <LaptopShowcase onZoom={showImage} />
          </div>
          <Mask />
        </section>
        <section id="free-from-manipulation">
          <div className="container">
            <div className="section-text" data-reveal>
              <h2 className="section-heading">
                轻巧一点，<span className="txt-gradient">自在一点。</span>
              </h2>
              <h4>需要的时候出现，读完之后继续。</h4>
              <p>
                Yita
                想做一个刚刚好的阅读伙伴：一个小小的浮窗，一段清楚的译文。把更多空间留给正在读的内容，也把选择留给你。
              </p>
              <div className="cta">
                <a className="strong" href={product.repository}>
                  认识这个开源项目
                </a>
              </div>
            </div>
          </div>
          <div className="planets" aria-hidden="true">
            <div className="yita-orbit" />
            <div className="planet-firefox yita-small-planet">
              <Languages />
            </div>
            <div className="planet-thunderbird yita-planet">
              <img
                src={asset("yita-mascot.png")}
                width="1280"
                height="1280"
                alt=""
                loading="lazy"
              />
            </div>
          </div>
          <Mask />
        </section>
        <section id="free-to-geek">
          <div className="container">
            <div className="section-text" data-reveal>
              <h2 className="section-heading">
                小小浮窗，<span className="txt-gradient">恰好够用。</span>
              </h2>
              <h4>把方便，放在每一个小地方。</h4>
              <p>
                从选中文字，到看懂一句话，再到追问一个概念。你需要的几个动作，都在手边。简单的默认设置，也留有按习惯调整的余地。
              </p>
            </div>
            <FeatureCards />
          </div>
          <Mask />
        </section>
        <section id="freedom-to-go-anywhere">
          <div className="container">
            <div className="section-text" data-reveal>
              <h2 className="section-heading">
                顺着思路，<span className="txt-gradient">继续读下去。</span>
              </h2>
              <h4>从一句话，到一整段理解。</h4>
              <p>
                读论文、看文档，或浏览外语网页。对可选取的文本，Yita
                把原文、译文和追问放在一起，让理解自然接续。
              </p>
              <a className="strong" href={product.guide}>
                查看使用指南
              </a>
            </div>
          </div>
          <div className="mobile-render layered-showcase" data-reveal>
            <img
              className="layered-settings"
              src={asset("screenshots/settings.png")}
              width="966"
              height="753"
              alt="Yita 的个性化设置"
              loading="lazy"
            />
            <img
              className="layered-reading"
              src={asset("screenshots/paragraph.png")}
              width="866"
              height="483"
              alt="选中外文段落后，Yita 在原文旁展开中文翻译"
              loading="lazy"
            />
            <div className="layered-phrase" aria-hidden="true">
              <div className="phrase-crop">
                <img
                  src={asset("screenshots/phrase.png")}
                  width="850"
                  height="498"
                  alt=""
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <Mask />
        </section>
        <section id="free-your-inbox">
          <div className="container">
            <div className="section-text">
              <div className="cta-section">
                <h2 className="cta-heading">
                  让翻译，<span className="txt-gradient">再快一点。</span>
                </h2>
                <h4 className="cta-sub-heading">下一次阅读，让 Yita 陪你。</h4>
              </div>
            </div>
            <div className="cta">
              <PlatformList />
              <button className="download-options" onClick={showDownloads}>
                选择你的桌面平台 <ChevronDown size={12} />
              </button>
              <button
                className="btn btn-gradient download-primary"
                onClick={showDownloads}
              >
                <Download size={19} /> 免费下载 Yita
              </button>
              <p className="download-note">
                v{product.version} <span>·</span> Windows / Apple Silicon Mac
              </p>
              <p className="setup-note">
                预览版 · 使用前需配置自己的模型 API Key
                <br />
                支持可复制文本，暂不支持图片 OCR。
              </p>
              <a className="small-link" href={product.release}>
                版本说明与所有安装包 <ArrowRight size={13} />
              </a>
            </div>
          </div>
          <Mask />
        </section>
      </main>
      <section id="whats-next">
        <div className="container">
          <div className="community-copy" data-reveal>
            <h2>
              让 Yita，
              <br />
              <span className="txt-gradient">一点点更好。</span>
            </h2>
            <p>
              好用的小工具，来自一次次真实的使用。
              <br />
              分享你的想法，报告问题，或提交一行代码。
              <br />
              一起把翻译这件事，变得更轻。
            </p>
            <div className="community-actions">
              <a className="btn btn-no-bg" href={product.repository}>
                <Github size={18} /> 前往 GitHub <ArrowRight size={17} />
              </a>
              <a className="community-issue" href={product.issues}>
                反馈与建议 <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <img
            className="community-mascot"
            src={asset("yita-mascot.png")}
            width="1280"
            height="1280"
            alt="抱着翻译词典的 Yita 水獭"
            loading="lazy"
          />
        </div>
      </section>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div>
              <Brand footer />
              <p>再快一点。再轻一点。再方便一点。</p>
            </div>
            <div className="footer-links">
              <div>
                <h3>Yita</h3>
                <a href="#free-from-chaos">产品介绍</a>
                <a href="#free-your-inbox">下载应用</a>
                <a href={product.release}>更新日志</a>
              </div>
              <div>
                <h3>使用帮助</h3>
                <a href={product.windowsGuide}>Windows 指南</a>
                <a href={product.macGuide}>Mac 预览指南</a>
                <a href={product.issues}>问题反馈</a>
              </div>
              <div>
                <h3>开放，一起创造</h3>
                <a href={product.repository}>源代码</a>
                <a href={product.contribute}>参与贡献</a>
                <a
                  href={`${import.meta.env.BASE_URL}source/yita-website-source.zip`}
                  download
                >
                  网站源码
                </a>
                <a href={`${import.meta.env.BASE_URL}SOURCE-NOTICE.txt`}>
                  网站来源与许可
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>Yita · An open-source translation companion.</span>
            <a href="#top">
              回到顶部 <ArrowDown size={13} />
            </a>
          </div>
        </div>
      </footer>
      <dialog
        ref={downloadDialog}
        className="download-dialog"
        aria-labelledby="download-title"
        onClose={() => {
          const active = document.activeElement;
          if (active === document.body || !active?.getClientRects().length) {
            const selector = window.matchMedia("(max-width: 1024px)").matches
              ? ".hamburger-btn"
              : ".nav-download";
            document.querySelector<HTMLButtonElement>(selector)?.focus();
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget)
            downloadDialog.current?.close();
        }}
      >
        <div className="dialog-inner">
          <button
            className="dialog-close"
            aria-label="关闭下载窗口"
            onClick={() => downloadDialog.current?.close()}
          >
            <X size={22} />
          </button>
          <img
            className="dialog-logo"
            src={asset("yita-icon-128.png")}
            width="56"
            height="56"
            alt=""
          />
          <h2 id="download-title">把 Yita 带到桌面。</h2>
          <p className="dialog-intro">v{product.version} · 免费开源预览版</p>
          <DownloadLinks />
          <p className="dialog-requirements">
            <Check size={15} /> 首次使用需配置自己的模型 API Key。
          </p>
          <p className="dialog-footnote">
            Windows 10 1809+ / 11（x64）。Mac 版适用于 Apple
            Silicon，仍处于预览验证阶段。模型服务可能另行计费。
          </p>
          <div className="dialog-links">
            <a href={product.windowsGuide}>Windows 安装指南</a>
            <a href={product.macGuide}>Mac 安装指南</a>
            <a href={product.release}>版本说明</a>
          </div>
        </div>
      </dialog>
      <dialog
        ref={imageDialog}
        className="image-dialog"
        aria-labelledby="image-title"
        onClick={(event) => {
          if (event.target === event.currentTarget)
            imageDialog.current?.close();
        }}
      >
        <div className="dialog-inner">
          <div className="image-dialog-heading">
            <h2 id="image-title">{zoom.title}</h2>
            <button
              className="dialog-close"
              aria-label="关闭图片"
              onClick={() => imageDialog.current?.close()}
            >
              <X size={22} />
            </button>
          </div>
          <img src={asset(`screenshots/${zoom.file}`)} alt={zoom.title} />
        </div>
      </dialog>
    </>
  );
}
