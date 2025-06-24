import type { ReactNode } from 'react';

interface Highlight {
  image?: ReactNode;
  svg?: ReactNode;
  title: string;
  paragraph: string | ReactNode;
}

export default function HighlightColumns({
  highlights,
}: {
  highlights: Highlight[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 lg:grid-cols-4 xl:gap-32">
      {highlights.map((highlight) => (
        <Highlight highlight={highlight} key={highlight.title} />
      ))}
    </div>
  );
}

const Highlight = ({ highlight }: { highlight: Highlight }) => {
  const Img: any = highlight.image;

  return (
    <div className="flex flex-col">
      <div className="relative mb-4 w-full">
        {highlight.image && <Img />}
        {highlight.svg && highlight.svg}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-foreground text-lg">{highlight.title}</h3>
        <p className="text-muted-foreground">{highlight.paragraph}</p>
      </div>
    </div>
  );
};
