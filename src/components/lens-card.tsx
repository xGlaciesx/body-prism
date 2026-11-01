export type LensTone = "structure" | "relationship" | "information";

export type Lens = {
  number: string;
  title: string;
  description: string;
  tone: LensTone;
};

type LensCardProps = {
  lens: Lens;
};

const toneText: Record<LensTone, string> = {
  structure: "text-structure",
  relationship: "text-relationship",
  information: "text-information",
};

const toneTop: Record<LensTone, string> = {
  structure: "border-t-structure",
  relationship: "border-t-relationship",
  information: "border-t-information",
};

export function LensCard({ lens }: LensCardProps) {
  return (
    <li
      className={`flex flex-col gap-3 rounded-xl border border-line border-t-4 bg-paper-2 p-6 ${toneTop[lens.tone]}`}
    >
      <p className={`text-sm font-medium ${toneText[lens.tone]}`}>
        {lens.number}
      </p>
      <h3 className="font-serif text-xl font-semibold text-ink">
        {lens.title}
      </h3>
      <p className="text-base leading-relaxed text-muted">{lens.description}</p>
    </li>
  );
}
