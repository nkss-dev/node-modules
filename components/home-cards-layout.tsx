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
      <button className="w-56">
        <figure
          className={clsx(
            'h-12 w-12 p-3 mb-3',
            'md:h-16 md:w-16 md:p-4 md:mb-4',
            'bg-palette-400 rounded-full'
          )}
        >
          {children}
        </figure>

        <hgroup className="text-start">
          <h3 className="text-hyperlink">
            <Balancer>{title}</Balancer>
          </h3>
          <p>
            <small>{description}</small>
          </p>
        </hgroup>
      </button>
    </Link>
  );
}
