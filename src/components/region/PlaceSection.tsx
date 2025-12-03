import { Section } from '@/lib/types';
import { PlaceDetail } from '../place/PlaceDetail';

interface PlaceSectionProps {
  section: Section;
}

// Color palette for section backgrounds
const sectionColors = [
  'bg-blue-50',
  'bg-green-50',
  'bg-amber-50',
  'bg-purple-50',
  'bg-rose-50',
  'bg-cyan-50',
];

export function PlaceSection({ section }: PlaceSectionProps) {
  // Generate a consistent color based on section ID
  const colorIndex = section.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % sectionColors.length;
  const bgColor = sectionColors[colorIndex];

  return (
    <section className={`${bgColor} rounded-3xl p-8 md:p-12 mb-16`}>
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{section.title}</h2>
        {section.description && (
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">{section.description}</p>
        )}
      </div>

      {/* Places */}
      <div className="space-y-16 max-w-5xl mx-auto">
        {section.places.map((place) => (
          <PlaceDetail key={place.id} place={place} />
        ))}
      </div>
    </section>
  );
}
