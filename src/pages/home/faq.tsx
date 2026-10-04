// Modified for Yita: product copy and destinations. See SOURCE-NOTICE.md.
// Ported from jnsahaj/tweakcn components/home/faq.tsx (Apache-2.0).
import { product } from "./product";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { Reveal } from "../components/LandingMotion";
import { faqs } from "./content";

export function FAQ() {
  return (
    <section
      id="faq"
      className="landing-section ch:w-full ch:py-24 ch:md:py-32"
      aria-labelledby="faq-title"
    >
      <div className="landing-container ch:container ch:mx-auto ch:px-4 ch:md:px-6">
        <div className="landing-faq-layout ch:grid ch:lg:grid-cols-12 ch:gap-12">
          <Reveal className="ch:lg:col-span-4">
            <h2
              id="faq-title"
              className="ch:text-3xl ch:md:text-5xl ch:font-bold ch:mb-6"
            >
              常见问题
            </h2>
            <p className="ch:text-muted-foreground ch:text-lg ch:mb-8">
              开始之前，你可能想了解这些。
            </p>
            <a
              href={product.guide}
              target="_blank"
              rel="noreferrer"
              className="ch:inline-flex ch:items-center ch:gap-2 ch:text-sm ch:hover:underline"
            >
              更多使用说明
              <ArrowRight size={15} />
            </a>
          </Reveal>
          <div className="ch:lg:col-span-8">
            <Accordion
              type="single"
              collapsible
              className="landing-faq-list ch:w-full ch:space-y-4"
            >
              {faqs.map(({ question, answer }, index) => (
                <Reveal key={question} delay={index * 0.05}>
                  <AccordionItem
                    value={`faq-${index}`}
                    className="landing-faq-item ch:border ch:rounded-lg ch:px-4 ch:bg-muted/20"
                  >
                    <AccordionTrigger className="landing-faq-trigger ch:hover:no-underline ch:text-lg ch:font-medium ch:py-6">
                      {question}
                    </AccordionTrigger>
                    <AccordionContent className="ch:text-muted-foreground ch:pb-6 ch:text-base">
                      <p>{answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                </Reveal>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
