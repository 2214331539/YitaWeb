// Adapted from local CreatorHub: Yita content, assets and preview dimensions.
import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useInView } from "motion/react";
import { useReducedAnimation } from "./LandingMotion";
import {
  Check,
  FileText,
  MousePointer2,
  Pin,
  MessageCircle,
  Pause,
  Play,
  BookOpen,
  SlidersHorizontal,
  Type,
  Waves,
  Globe,
  Keyboard,
  Code2,
  KeyRound,
} from "lucide-react";
import { IconButton } from "../../components/ui/IconButton";

const rows = [
  [
    { label: "划词即译", icon: MousePointer2 },
    { label: "流式翻译", icon: Waves },
    { label: "阅读浮窗", icon: BookOpen },
    { label: "固定窗口", icon: Pin },
    { label: "随时追问", icon: MessageCircle },
  ],
  [
    { label: "网页阅读", icon: Globe },
    { label: "可复制 PDF", icon: FileText },
    { label: "Markdown", icon: Type },
    { label: "代码解释", icon: Code2 },
    { label: "剪贴板快捷键", icon: Keyboard },
  ],
  [
    { label: "个人术语", icon: BookOpen },
    { label: "原文对照", icon: Check },
    { label: "阅读偏好", icon: SlidersHorizontal },
    { label: "自选 API", icon: KeyRound },
    { label: "开源免费", icon: Check },
  ],
];

// TweakCN's duplicated marquee rows, paused outside the viewport and on interaction.
export function CapabilityMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const reduced = useReducedAnimation();
  const [paused, setPaused] = useState(false);
  return (
    <div
      ref={ref}
      className="landing-capability-strip"
      aria-label="产品能力"
      data-paused={paused || !visible || !!reduced}
    >
      <div className="landing-marquee-rows">
        {rows.map((items, row) => (
          <div className="landing-marquee-row" key={row}>
            <div
              className="landing-marquee-track"
              style={
                {
                  "--marquee-offset": row === 1 ? "-100px" : "0px",
                  "--marquee-distance": `${items.length * 216}px`,
                  "--marquee-duration": `${items.length * 5}s`,
                } as CSSProperties
              }
            >
              {[0, 1, 2, 3].map((copy) => (
                <div
                  className={`landing-marquee-group${copy ? " marquee-copy" : ""}`}
                  aria-hidden={copy ? true : undefined}
                  key={copy}
                >
                  {items.map(({ label, icon: Icon }, index) => (
                    <span
                      className={`landing-capability color-${index}`}
                      key={label}
                    >
                      <Icon size={15} aria-hidden="true" />
                      {label}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {!reduced ? (
        <IconButton
          className="landing-marquee-control"
          label={paused ? "播放产品能力展示" : "暂停产品能力展示"}
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </IconButton>
      ) : null}
    </div>
  );
}
