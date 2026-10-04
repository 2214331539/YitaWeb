// Adapted from CreatorHub header, originally TweakCN (Apache-2.0).
import { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ArrowDown, Code2, Menu, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "./ui/utils";
import { product } from "./product";

const sections = [
  { href: "#features", label: "产品能力" },
  { href: "#how-it-works", label: "开始使用" },
  { href: "#community", label: "开源社区" },
  { href: "#faq", label: "常见问题" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [dark, setDark] = useState(
    () => document.documentElement.dataset.theme === "dark",
  );
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(scrollY > 10);
      setActive(
        sections
          .filter(({ href }) => {
            const element = document.getElementById(href.slice(1));
            return (
              element &&
              element.getBoundingClientRect().top <=
                Math.min(innerHeight * 0.3, 180)
            );
          })
          .at(-1)?.href ?? "",
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next ? "#1c211e" : "#fffcf7");
    try {
      localStorage.setItem("yita-theme", next ? "dark" : "light");
    } catch {
      /* Storage is optional. */
    }
  };
  const themeToggle = (
    <Button
      variant="ghost"
      size="icon"
      className="ch:rounded-full"
      onClick={toggleTheme}
      aria-label={dark ? "切换浅色模式" : "切换深色模式"}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
  return (
    <header
      className={cn(
        "tweak-home landing-header ch:sticky ch:top-0 ch:z-50 ch:w-full ch:bg-background ch:text-foreground",
        scrolled && "is-scrolled",
      )}
    >
      <div className="header-inner ch:container ch:mx-auto ch:relative ch:flex ch:h-16 ch:items-center ch:justify-between ch:px-4 ch:md:px-6">
        <a href="#top" aria-label="Yita 首页" className="yita-brand">
          <img src="./assets/yita-icon-128.png" alt="" width="34" height="34" />
          <span>Yita</span>
        </a>
        <nav
          className="ch:absolute ch:left-1/2 ch:hidden ch:-translate-x-1/2 ch:items-center ch:gap-4 ch:md:flex ch:lg:gap-8"
          aria-label="主导航"
        >
          {sections.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              aria-current={active === href ? "location" : undefined}
              className="ch:text-muted-foreground ch:hover:text-foreground ch:group ch:relative ch:text-xs ch:font-medium ch:transition-colors ch:lg:text-sm"
            >
              {label}
              <span className="ch:bg-primary ch:absolute ch:-bottom-1 ch:left-0 ch:h-0.5 ch:w-0 ch:transition-all ch:duration-300 ch:group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="ch:hidden ch:items-center ch:gap-3 ch:md:flex">
          <Button asChild variant="ghost" size="icon">
            <a
              href={product.repository}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub 源码"
            >
              <Code2 size={19} />
            </a>
          </Button>
          {themeToggle}
          <Button asChild className="ch:rounded-full">
            <a href="#download">
              下载 Yita <ArrowDown size={15} />
            </a>
          </Button>
        </div>
        <div className="ch:flex ch:items-center ch:gap-2 ch:md:hidden">
          {themeToggle}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="ghost" size="icon" aria-label="打开导航">
                <Menu size={22} />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="dropdown-menu"
                align="end"
                sideOffset={12}
              >
                {sections.map(({ href, label }) => (
                  <DropdownMenu.Item asChild key={href}>
                    <a href={href}>{label}</a>
                  </DropdownMenu.Item>
                ))}
                <DropdownMenu.Separator />
                <DropdownMenu.Item asChild>
                  <a href="#download">下载 Yita</a>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <a href={product.repository} target="_blank" rel="noreferrer">
                    GitHub 源码
                  </a>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </header>
  );
}
