import { Section, MaxWidth, ContentWrapper, BackgroundLayer } from "@/components/layout/primitives";
import { SectionHeader } from "@/components/shared/section-header";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function FAQSection() {
  return (
    <Section id="faq" background="darker">
      <BackgroundLayer showNoise />
      <MaxWidth>
        <SectionHeader
          subheading="FAQ"
          title="Frequently Asked Questions"
          description="Have questions? Read some of our common operational guidelines."
        />
        <ContentWrapper className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="faq-1">
              <AccordionTrigger>How long does development take?</AccordionTrigger>
              <AccordionContent>
                Standard projects compile in 2-4 weeks, custom web apps in 4-8 weeks.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger>How do you track telemetry and analytics?</AccordionTrigger>
              <AccordionContent>
                We use integrated data attributes (`data-analytics`) mapping click operations.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ContentWrapper>
      </MaxWidth>
    </Section>
  );
}
