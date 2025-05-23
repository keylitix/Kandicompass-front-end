import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

export default function FAQ() {
  return (
    <div className="bg-wrapper">
      <div className="left-spark" />
      <div className="right-spark" />
      <div className="container mx-auto px-[100px]">
        <div className="h-[300px] flex items-center justify-center">
          <h1 className="font-[700] text-[46px] bg-gradient-to-r from-[#FF005D] to-[#00D1FF] bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
        </div>

        <div className="mb-[100px]">
          <Accordion type="multiple" className="space-y-4">
            {[
              {
                question: 'What is Lorem Ipsum?',
                answer:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text ever since the 1500s.",
              },
              {
                question: 'Why do we use it?',
                answer:
                  'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Using Lorem Ipsum allows designers to focus on layout rather than content.',
              },
              {
                question: 'Where can I get some?',
                answer:
                  "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, often injected with humour or randomised words which don't look even slightly believable.",
              },
              {
                question: 'Is Lorem Ipsum safe to use?',
                answer:
                  "Yes, it's perfectly safe. Lorem Ipsum is essentially nonsense text. It doesn't contain malicious code or data. It's simply placeholder content for design mockups and testing.",
              },
              {
                question: 'Can I use Lorem Ipsum for commercial projects?',
                answer:
                  "Absolutely. It's been widely used in publishing and design since the 1960s. Most modern typesetting systems support it, and there's no licensing needed.",
              },
              {
                question: 'What are some alternatives to Lorem Ipsum?',
                answer:
                  'Alternatives include Bacon Ipsum, Hipster Ipsum, Cupcake Ipsum, and Corporate Ipsum. These provide stylistically different placeholder texts for various audiences and tones.',
              },
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-sm font-semibold flex justify-between items-center w-full text-left">
                  <h1 className="text-lg font-semibold">{faq.question}</h1>
                </AccordionTrigger>
                <AccordionContent className="text-xs font-sans leading-[1.6]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
