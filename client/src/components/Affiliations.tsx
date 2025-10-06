export interface Affiliation {
  id: number;
  name: string;
  logo: string;
}

interface AffiliationsProps {
  affiliations: Affiliation[];
}

export function Affiliations({ affiliations }: AffiliationsProps) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-center text-muted-foreground font-semibold mb-8">
          Accredited & Affiliated With
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
          {affiliations.map((affiliation) => (
            <div
              key={affiliation.id}
              className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
              data-testid={`affiliation-${affiliation.id}`}
            >
              <div className="text-2xl font-bold text-center">{affiliation.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
