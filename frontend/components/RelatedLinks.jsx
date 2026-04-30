import Link from 'next/link';
import { MapPin, ArrowUpRight } from 'lucide-react';

/**
 * RelatedLinks — renders a grid of internal links to related programmatic SEO pages.
 * Used for hub-and-spoke internal linking: from canonical pages → programmatic pages,
 * from programmatic → siblings → canonical.
 */
export default function RelatedLinks({
  title,
  subtitle,
  pages = [],
  variant = 'default', // 'default' | 'compact' | 'pill'
  icon = MapPin,
  className = '',
}) {
  if (!pages || pages.length === 0) return null;
  const Icon = icon;

  if (variant === 'pill') {
    return (
      <section className={`section-padding bg-slate-50 ${className}`}>
        <div className="container-medical max-w-5xl">
          <div className="mb-8">
            {subtitle && <p className="eyebrow mb-3">{subtitle}</p>}
            <h2 className="font-outfit text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">{title}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {pages.map(p => (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:border-sky-500 hover:text-sky-700 rounded-full text-sm font-medium text-slate-700 transition-colors"
              >
                {p.location || p.title}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`section-padding ${variant === 'compact' ? 'pt-0' : 'bg-slate-50'} ${className}`}>
      <div className="container-medical">
        <div className="max-w-2xl mb-10">
          {subtitle && <p className="eyebrow mb-3">{subtitle}</p>}
          <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight leading-tight">{title}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {pages.map(p => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className="card-base p-5 hover:border-sky-300 hover:shadow-soft transition-all flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 flex-shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 line-clamp-2">
                  {p.location ? `${p.procedureName || p.conditionName || 'Treatment'} in ${p.location}` : p.title}
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
