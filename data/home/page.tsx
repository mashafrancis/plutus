import { AlignLeft, Globe, PieChart, ScanFace } from "lucide-react";
import dynamic from "next/dynamic";

const HomeHero = dynamic(() => import("@/components/sections/home-hero"));

export const page = {
  heroSection: {
    // title: 'Plutus',
    // icon: Icons.logo,
    h1: "Unleashing Your Financial IQ",
    subheader: [
      "It's not whether you're right or wrong that's important, but how much money you make when you're right and how much you lose when you're wrong.",
    ],
    image: <HomeHero />,
    ctas: [
      {
        label: "Try it for free",
        href: "/login",
        type: "primary" as any,
      },
    ],
  },
  highlightsSection: {
    highlights: [
      {
        title: "Easy to use",
        paragraph: "Track expenses on-the-go with categorization and logging.",
        svg: (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/50 bg-primary/10 p-2">
            <Globe className="h-7 w-7 stroke-[1.4px] text-primary" />
          </div>
        ),
      },
      {
        title: "Data-driven insights",
        paragraph:
          "Expense tracker can provide valuable insights into your spending habits, allowing you to make more informed decisions",
        svg: (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/50 bg-primary/10 p-2">
            <AlignLeft className="h-7 w-7 stroke-[1.4px] text-primary" />
          </div>
        ),
      },
      {
        title: "Identify overspending",
        paragraph:
          "Take control of your finances by identifying and reducing overspending with an expense tracker",
        svg: (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/50 bg-primary/10 p-2">
            <PieChart className="h-7 w-7 stroke-[1.4px] text-primary" />
          </div>
        ),
      },
      {
        title: "Real-time visibility",
        paragraph:
          "Monitor your expenses in real-time, whether you are at home or on-the-go, with a user-friendly interface",
        svg: (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/50 bg-primary/10 p-2">
            <ScanFace className="h-7 w-7 stroke-[1.4px] text-primary" />
          </div>
        ),
      },
    ],
  },
};
