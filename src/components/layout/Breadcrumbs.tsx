import Link from 'next/link';

interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
      <Link href="/" className="hover:text-primary-600 transition-colors">
        Главная
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-gray-400">/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-primary-600 transition-colors">
              {item.title}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.title}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
