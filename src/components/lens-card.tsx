export type Lens = {
  number: string;
  title: string;
  description: string;
};

type LensCardProps = {
  lens: Lens;
};

export function LensCard({ lens }: LensCardProps) {
  return (
    <li className="flex flex-col gap-3 rounded-xl border border-[#ded4c5] bg-[#fffdf8] p-6">
      <p className="text-sm font-medium text-[#a6474f]">{lens.number}</p>
      <h3 className="font-serif text-xl font-semibold text-[#1c1a17]">
        {lens.title}
      </h3>
      <p className="text-base leading-relaxed text-[#6f675c]">
        {lens.description}
      </p>
    </li>
  );
}
