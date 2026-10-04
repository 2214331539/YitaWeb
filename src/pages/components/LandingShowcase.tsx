// Adapted from local CreatorHub: Yita content, assets and preview dimensions.
import { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, X, ZoomIn } from "lucide-react";
import { IconButton } from "../../components/ui/IconButton";
import { Reveal } from "./LandingMotion";

const examples = [
  {
    src: "./assets/yita-avalonia-reading.png",
    title: "译文就在旁边",
    alt: "Yita 阅读浮窗：原文译文切换、固定窗口与追问输入框",
  },
  {
    src: "./assets/yita-avalonia-settings.png",
    title: "一切，按你的习惯",
    alt: "Yita 常规设置：划词翻译、兼容取词和触发偏好",
  },
];

export default function LandingShowcase() {
  const [selected, setSelected] = useState<number | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const sample = examples[selected ?? 0];
  const move = (offset: number) =>
    setSelected((index) =>
      index === null
        ? null
        : (index + offset + examples.length) % examples.length,
    );
  return (
    <section
      className="landing-showcase ch:relative ch:isolate ch:w-full ch:py-20 ch:md:py-32"
      aria-labelledby="showcase-title"
    >
      <div className="landing-container ch:container ch:mx-auto ch:px-4 ch:md:px-6">
        <Reveal className="landing-section-heading ch:flex ch:flex-col ch:items-center ch:justify-center ch:space-y-4 ch:text-center">
          <h2
            id="showcase-title"
            className="ch:text-3xl ch:font-bold ch:md:text-5xl ch:lg:text-6xl"
          >
            读下去，不必跳出去
          </h2>
          <p className="ch:text-muted-foreground ch:max-w-[600px] ch:text-lg ch:md:text-xl">
            安静的阅读浮窗，熟悉的湖畔配色。翻译，也可以是阅读的一部分。
          </p>
        </Reveal>
        <Dialog.Root
          open={selected !== null}
          onOpenChange={(open) => {
            if (!open) setSelected(null);
          }}
        >
          <div className="landing-preview-gallery">
            {examples.map(({ src, title, alt }, index) => (
              <Reveal
                key={src}
                delay={index * 0.1}
                className="landing-preview-item"
              >
                <figure>
                  <button
                    type="button"
                    className="landing-preview-open"
                    aria-label={`查看${title}`}
                    onClick={(event) => {
                      trigger.current = event.currentTarget;
                      setSelected(index);
                    }}
                  >
                    <div
                      className={`yita-preview-stage yita-preview-stage--${index}`}
                    >
                      <span className="preview-label" aria-hidden="true">
                        {index === 0
                          ? "READ. SELECT. UNDERSTAND."
                          : "MAKE IT YOURS."}
                      </span>
                      <img
                        src={src}
                        alt={alt}
                        width={index === 0 ? 569 : 964}
                        height={index === 0 ? 257 : 721}
                        loading="lazy"
                      />
                    </div>
                    <span className="landing-preview-zoom" aria-hidden="true">
                      <ZoomIn size={19} />
                    </span>
                  </button>
                  <figcaption>{title}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <Dialog.Portal>
            <Dialog.Overlay className="landing-image-overlay" />
            <Dialog.Content
              className="landing-image-viewer"
              onCloseAutoFocus={(event) => {
                event.preventDefault();
                trigger.current?.focus();
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                  event.preventDefault();
                  move(event.key === "ArrowLeft" ? -1 : 1);
                }
              }}
            >
              <div className="landing-image-toolbar">
                <div>
                  <Dialog.Title>{sample.title}</Dialog.Title>
                  <Dialog.Description>
                    Yita 当前 Avalonia 界面的演示文本截图，非在线翻译演示
                  </Dialog.Description>
                </div>
                <div className="landing-image-controls">
                  <span>
                    {(selected ?? 0) + 1} / {examples.length}
                  </span>
                  <IconButton label="上一张样例" onClick={() => move(-1)}>
                    <ArrowLeft size={18} />
                  </IconButton>
                  <IconButton label="下一张样例" onClick={() => move(1)}>
                    <ArrowRight size={18} />
                  </IconButton>
                  <Dialog.Close asChild>
                    <IconButton label="关闭图片预览">
                      <X size={19} />
                    </IconButton>
                  </Dialog.Close>
                </div>
              </div>
              <img
                className="landing-image-full"
                src={sample.src}
                alt={sample.alt}
                width={selected === 0 ? 569 : 964}
                height={selected === 0 ? 257 : 721}
              />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </section>
  );
}
