export type Moment = {
  src: string;
  alt: string;
  caption: string;
  year: number;
  /** 1-12. Optional: moments without a month still appear under their year and "All months". */
  month?: number;
};

// Milestones in reverse-chronological order (latest first).
export const moments: Moment[] = [
  {
    src: "/scaler_spotlight.webp",
    alt: "Anand Thakkar holding the Scaler Spotlight trophy engraved with his name at an evening event in Bangalore, 5th September 2026",
    caption:
      "My name. On a trophy. Still feels a little unreal. They call it Spotlight and then hang a thousand fairy lights around you, just to make sure there's nowhere to hide. 😅 But some nights you stop hiding and just own it. Holding this trophy with my name on it, under all those lights, is a moment I worked hard for and I'm letting myself feel every bit of it. Nights like this are the reason you keep going. On to whatever's next. Bangalore, 5th September 2026",
    year: 2026,
    month: 9,
  },
  {
    src: "/anand_thakkar_press_collage.jpg",
    alt: "Anand Thakkar's career journey featured across 12 newspapers in Gujarati, Hindi, and English, July 2026",
    caption:
      "Grateful and humbled to see my journey featured across 12 publications in Gujarati, Hindi, and English, spanning multiple regions. What means the most is not the coverage itself, but the hope that my path, from eight years in tax practice to software engineering, can encourage the thousands out there walking a similar road. If you are rebuilding your career from scratch, I hope this is a small reminder that it is never too late to begin again. July 2026",
    year: 2026,
    month: 7,
  },
  {
    src: "/hcltech-inauguration-2026.jpg",
    alt: "Anand Thakkar interacting with Shri Harsh Sanghavi, Deputy Chief Minister of Gujarat, at the inauguration of HCLTech's GIFT City campus, 17th July 2026",
    caption:
      "Honoured to meet Shri Harsh Sanghavi, Hon'ble Deputy Chief Minister of Gujarat, during the inauguration of HCLTech's new campus at GIFT City, Gandhinagar. I had the opportunity to share my professional journey with him and welcome him to our new campus. I told him it is a privilege to be part of this campus, and that opportunities like this let many professionals build global careers while staying closer to their families. It was encouraging to hear his appreciation for that perspective. 17th July, 2026",
    year: 2026,
    month: 7,
  },
  {
    src: "/hcltech-joining.jpg",
    alt: "Anand Thakkar on his first day as Senior Technical Lead at HCLTech, GIFT City, 2026",
    caption: "Day one as Senior Technical Lead at HCLTech, GIFT City, 2026",
    year: 2026,
    month: 7,
  },
  {
    src: "/singapore-2024.jpg",
    alt: "Anand Thakkar in front of the Buddha Tooth Relic Temple with Singapore's skyscrapers behind, 2024",
    caption:
      "Striking a balance between tradition and rapid development! Singapore's cityscape seamlessly blends soaring skyscrapers with serene temples. Singapore, 2024",
    year: 2024,
  },
  {
    src: "/cape-town-2023.jpg",
    alt: "Anand Thakkar at the Cape of Good Hope, the most south-western point of the African continent, Cape Town, 2023",
    caption:
      "Just like in my career, I never stopped at the surface. I chose to go deeper, explore more, and embrace every opportunity that came my way. Cape Town, 2023",
    year: 2023,
  },
  {
    src: "/gdg-devfest-2022.jpg",
    alt: "Anand Thakkar at his first Google Developer Group DevFest, 2022",
    caption: "My first GDG DevFest, 2022",
    year: 2022,
  },
  {
    src: "/first-it-job-2022.jpg",
    alt: "Anand Thakkar at his desk during his first IT job as a software developer, 2022",
    caption: "My very first IT job as a software developer, 2022",
    year: 2022,
  },
  {
    src: "/family-business-2018.jpg",
    alt: "Anand Thakkar taking charge of the family business, 2018",
    caption: "Taking charge of a family business, 2018",
    year: 2018,
  },
  {
    src: "/techspark-2017-bengaluru.jpg",
    alt: "Anand Thakkar as a delegate at his first TechSpark, Bengaluru, 2017",
    caption: "My first TechSpark as a delegate, Bengaluru, 2017",
    year: 2017,
  },
  {
    src: "/taxaltus-techsparks-2017.jpg",
    alt: "TechSparks 2017 delegate badge with Anand Thakkar representing Taxaltus, Bengaluru",
    caption: "Promoting Taxaltus, my non-profit tax companion, Bengaluru, 2017",
    year: 2017,
  },
];
