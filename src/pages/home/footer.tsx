// Adapted from CreatorHub Footer, originally TweakCN (Apache-2.0).
import { ArrowUpRight } from "lucide-react";
import { product } from "./product";

export function Footer() {
  return (
    <footer className="landing-footer ch:bg-background/95 ch:w-full ch:border-t">
      <div className="landing-container ch:container ch:mx-auto ch:flex ch:flex-col ch:gap-8 ch:px-4 ch:py-10 ch:md:px-6 ch:lg:py-16">
        <div className="ch:grid ch:gap-8 ch:sm:grid-cols-2 ch:md:grid-cols-4">
          <div className="ch:col-span-2 ch:max-w-md ch:space-y-4">
            <a href="#top" className="yita-brand">
              <img
                src="./assets/yita-icon-128.png"
                width="34"
                height="34"
                alt=""
              />
              <span>Yita</span>
            </a>
            <p className="ch:text-muted-foreground ch:text-sm">
              少一点打扰，多一点理解。
              <br />
              让翻译停留在阅读发生的地方。
            </p>
          </div>
          <nav aria-label="产品导航" className="ch:space-y-4">
            <h2 className="ch:text-sm ch:font-bold">产品</h2>
            <ul className="ch:space-y-2 ch:text-sm ch:text-muted-foreground">
              <li>
                <a href="#features">产品能力</a>
              </li>
              <li>
                <a href="#how-it-works">开始使用</a>
              </li>
              <li>
                <a href="#download">下载 Yita</a>
              </li>
            </ul>
          </nav>
          <nav aria-label="开源导航" className="ch:space-y-4">
            <h2 className="ch:text-sm ch:font-bold">一起参与</h2>
            <ul className="ch:space-y-2 ch:text-sm ch:text-muted-foreground">
              <li>
                <a href={product.repository} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href={product.issues} target="_blank" rel="noreferrer">
                  问题与建议
                </a>
              </li>
              <li>
                <a href={product.release} target="_blank" rel="noreferrer">
                  更新记录
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="ch:border-border/60 ch:flex ch:flex-col ch:items-center ch:justify-between ch:gap-4 ch:border-t ch:pt-8 ch:sm:flex-row">
          <p className="ch:text-muted-foreground ch:text-xs">
            © {new Date().getFullYear()} Yita · MIT License
          </p>
          <a className="footer-top" href="#top">
            再读一遍
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}
