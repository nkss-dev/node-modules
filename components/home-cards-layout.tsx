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
        <figure className="bg-palette-400 w-fit p-4 mb-4 rounded-full">
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
