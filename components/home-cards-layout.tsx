import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';
import Balancer from 'react-wrap-balancer';

export default function HomeCardsLayout({
  href,
  title,
  description,
  children,
}: {
  href: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Link href={href}>
      <button
        className={clsx(
          'inline-flex gap-4 min-w-min text-start',
          'sm:flex sm:flex-col sm:w-56'
        )}
      >
        <figure
          className={clsx(
            'h-12 w-12 p-3',
            'md:h-16 md:w-16 md:p-4',
            'bg-palette-400 rounded-full'
          )}
        >
          {children}
        </figure>

        <hgroup className="w-fit">
          <h3
            className={clsx('mb-1 md:mb-2', 'text-hyperlink max-w-fit')}
          >
            <Balancer className="min-w-fit">{title}</Balancer>
          </h3>
          <p className="max-w-fit text-palette-800 dark:text-palette-300">
            <small className="min-w-fit">{description}</small>
          </p>
        </hgroup>
      </button>
    </Link>
  );
}
