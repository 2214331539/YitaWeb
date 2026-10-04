import { ArrowUpRight, Code2, MessageSquare, BookOpen } from "lucide-react";
import { Reveal } from "../components/LandingMotion";
import { product } from "./product";

const entries = [
  {
    icon: Code2,
    title: "一起写代码",
    description: "阅读源码，参与改进。",
    href: product.repository,
  },
  {
    icon: MessageSquare,
    title: "告诉我们你的想法",
    description: "报告问题，聊聊建议。",
    href: product.issues,
  },
  {
    icon: BookOpen,
    title: "让使用更简单",
    description: "完善文档，分享经验。",
    href: product.contribute,
  },
];
export function Community() {
  return (
    <section
      id="community"
      className="landing-section community-section ch:w-full ch:py-20 ch:md:py-32"
    >
      <div className="landing-container ch:container ch:mx-auto ch:px-4 ch:md:px-6">
        <div className="community-layout">
          <Reveal className="community-story">
            <div className="mascot-note">
              <img
                src="./assets/yita-mascot.png"
                alt="抱着湖绿色词典的 Yita 水獭"
                width="160"
                height="160"
                loading="lazy"
              />
              <span>你的安静阅读搭子。</span>
            </div>
            <span className="section-kicker">SMALL APP. OPEN HEART.</span>
            <h2 className="ch:text-3xl ch:md:text-5xl ch:font-bold">
              一只小水獭，
              <br />
              <span className="ch:text-primary">和一群爱阅读的人。</span>
            </h2>
            <p>
              Yita 是一个持续生长的开源项目。
              <br />
              每一个反馈，都能让下一次阅读更顺手。
            </p>
          </Reveal>
          <Reveal className="community-entries" delay={0.1}>
            {entries.map(({ icon: Icon, title, description, href }, index) => (
              <a href={href} key={title} target="_blank" rel="noreferrer">
                <span className="community-index">0{index + 1}</span>
                <Icon size={22} />
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <ArrowUpRight size={21} />
              </a>
            ))}
            <p className="community-license">
              免费开源 · MIT License · 欢迎贡献
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
