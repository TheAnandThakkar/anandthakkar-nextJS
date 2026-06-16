const beliefs = [
  {
    number: "01",
    title: "Finance is the original information system.",
    body: "Before databases, before the internet, money was the language societies used to record value, trust, and time. Software didn't replace that. It inherited it. The best fintech is built by people who understand both.",
  },
  {
    number: "02",
    title: "Reinvention is not a crisis. It's a skill.",
    body: "I changed fields in my thirties. Not because I failed, but because I was curious. The ability to start over, carry what matters, and discard what doesn't is one of the most underrated things a person can learn to do.",
  },
  {
    number: "03",
    title: "Complexity is usually a design failure.",
    body: "Whether it's a tax return, an API, or a conversation, if it's hard to understand, it's probably hard for the wrong reasons. The goal is always to make something difficult feel simple. That takes more work, not less.",
  },
  {
    number: "04",
    title: "India's next chapter will be written in code.",
    body: "We are at the beginning of something enormous. UPI, ONDC, account aggregators, digital public infrastructure. The country is building financial rails that will carry the next hundred million people into the economy. I want to be part of that.",
  },
] as const;

export function Philosophy() {
  return (
    <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
      {beliefs.map((belief) => (
        <div
          key={belief.number}
          className="card p-6 sm:p-8 flex flex-col gap-3"
        >
          <span className="text-3xl font-black text-magenta/20 dark:text-magenta/15 leading-none select-none">
            {belief.number}
          </span>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white leading-snug">
            {belief.title}
          </h3>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {belief.body}
          </p>
        </div>
      ))}
    </div>
  );
}
