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

        <div className="mb-[100px] space-y-6">
          {[
            {
              question: 'What is Lorem Ipsum?',
              answer:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            },
            {
              question: 'Where can I get some?',
              answer:
                'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.',
            },
            {
              question: 'Why do we use it?',
              answer:
                'It is a long established fact that a reader will be distracted by the readable content of a page.',
            },
          ].map((faq, i) => (
            <div key={i} className="p-3">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">{faq.question}</h3>
                <p className="text-xs font-sans leading-[1.6]">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
