import Link from 'next/link';
import { ReactNode } from 'react';

export default function HomePageCardLayout({
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
      <article className="h-auto w-72">
        <figure className='bg-palette-400 h-72 px-4 pt-4 rounded-lg relative'>
        {children}
        </figure>

        <br />

        <hgroup className="text-center">
          <h3 className="text-hyperlink">{title}</h3>
          <p>
            <small>{description}</small>
          </p>
        </hgroup>
      </article>
    </Link>
  );
}
