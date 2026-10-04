// Modified for Yita: product copy and destinations. See SOURCE-NOTICE.md.
// Ported from jnsahaj/tweakcn components/home/how-it-works.tsx (Apache-2.0).
import { Reveal } from "../components/LandingMotion";
import { steps } from "./content";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="landing-section landing-process ch:w-full ch:py-24 ch:md:py-32 ch:relative ch:overflow-hidden ch:isolate"
      aria-labelledby="process-title"
    >
      <div className="landing-container ch:container ch:mx-auto ch:px-4 ch:md:px-6">
        <div className="ch:flex ch:flex-col ch:md:flex-row ch:md:items-end ch:justify-between ch:mb-16 ch:gap-6">
          <Reveal className="ch:max-w-2xl">
            <h2
              id="process-title"
              className="ch:text-3xl ch:md:text-5xl ch:font-bold ch:mb-4"
            >
              从一段文字
              <br />
              <span className="ch:text-primary">到读懂它</span>
            </h2>
            <p className="ch:text-muted-foreground ch:text-lg ch:md:text-xl ch:max-w-[600px]">
              第一次做好设置，之后只需轻轻一划。
            </p>
          </Reveal>
        </div>
        <ol className="landing-steps ch:grid ch:md:grid-cols-3 ch:gap-8">
          {steps.map(({ step, title, description }, index) => (
            <li key={step}>
              <Reveal delay={index * 0.2} className="ch:relative ch:group">
                <div className="ch:mb-6 ch:relative">
                  <span className="landing-step-number ch:text-8xl ch:font-bold ch:text-muted/20 ch:group-hover:text-primary/10 ch:transition-colors ch:duration-500 ch:block">
                    {step}
                  </span>
                  <div className="ch:absolute ch:bottom-4 ch:left-2 ch:w-12 ch:h-1 ch:bg-primary ch:rounded-full" />
                </div>
                <h3 className="ch:text-2xl ch:font-bold ch:mb-3">{title}</h3>
                <p className="ch:text-muted-foreground ch:text-lg ch:leading-relaxed">
                  {description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
