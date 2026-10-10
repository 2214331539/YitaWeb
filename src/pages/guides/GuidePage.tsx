import { ArrowDown, ArrowRight, Download } from "lucide-react";
import { product } from "../home/product";
import { guidePages, type GuidePageContent } from "./content";

export default function GuidePage({ page }: { page: GuidePageContent }) {
  return (
    <div className="guide-page" id="top">
      <a href="#guide-content" className="skip-link">
        跳到主要内容
      </a>
      <header className="guide-header">
        <a className="guide-brand" href="./" aria-label="Yita 官网首页">
          <img src="./assets/yita-icon-128.png" width="42" height="42" alt="" />
          <span>Yita</span>
        </a>
        <nav aria-label="主导航">
          <a href="./">产品介绍</a>
          <a href="./#free-your-inbox">
            下载 Yita <ArrowDown size={14} />
          </a>
        </nav>
      </header>
      <main id="guide-content">
        <div className="guide-hero">
          <div className="guide-width">
            <nav className="guide-breadcrumb" aria-label="面包屑">
              <a href="./">Yita 官网</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{page.label}</span>
            </nav>
            <p className="guide-eyebrow">{page.eyebrow}</p>
            <h1>
              {page.heading.split("\n").map((line, index) => (
                <span key={line}>
                  {index > 0 && <br />}
                  {line}
                </span>
              ))}
            </h1>
            <p className="guide-intro">{page.introduction}</p>
            {page.download && (
              <div className="guide-download">
                <a href={page.download.href}>
                  <Download size={18} />
                  {page.download.label}
                </a>
                <p>{page.download.note}</p>
                <p>软件免费 · 需自备模型 API Key，模型服务可能另行计费</p>
              </div>
            )}
          </div>
        </div>
        <div className="guide-layout guide-width">
          <aside className="guide-toc">
            <nav aria-label="本页目录">
              <p>这一页里</p>
              {page.sections.map((section) => (
                <a key={section.id} href={`#${section.id}`}>
                  {section.title}
                </a>
              ))}
            </nav>
            <a className="guide-version" href={product.release}>
              v{product.version}
              <br />
              版本说明 <ArrowRight size={13} />
            </a>
          </aside>
          <article className="guide-article" aria-label={page.label}>
            {page.sections.map((section, index) => (
              <section key={section.id} id={section.id}>
                <span className="guide-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.steps && (
                  <ol>
                    {section.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                )}
                {section.questions?.map((item) => (
                  <details key={item.question} open>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
                {section.link && (
                  <a className="guide-text-link" href={section.link.href}>
                    {section.link.label}
                    <ArrowRight size={16} />
                  </a>
                )}
              </section>
            ))}
          </article>
        </div>
        <nav className="guide-related guide-width" aria-label="继续了解 Yita">
          <p>继续了解 Yita</p>
          {guidePages
            .filter((item) => item.file !== page.file)
            .map((item) => (
              <a key={item.file} href={`./${item.file}`}>
                {item.label}
                <ArrowRight size={20} />
              </a>
            ))}
        </nav>
      </main>
      <footer className="guide-footer guide-width">
        <a href="./" className="guide-brand">
          Yita
        </a>
        <p>再快一点。再轻一点。再方便一点。</p>
        <a href={product.repository}>GitHub</a>
        <a href="./SOURCE-NOTICE.txt">网站来源与许可</a>
      </footer>
    </div>
  );
}
