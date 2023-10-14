import Balancer from 'react-wrap-balancer';

export default function DefaultLayout({
  title,
  description,
  prompt,
  alert,
  children,
}: {
  title: string;
  description?: string | JSX.Element;
  prompt?: string | JSX.Element;
  alert?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <hgroup className="mb-2 sm:mb-4 md:mb-6 text-palette-700 dark:text-palette-100">
        <h1>
          <Balancer>{title}</Balancer>
        </h1>
        <p>{description}</p>

        <hr className="mt-2 mb-2" />

        {alert ? (
          <p className="text-red-400">
            <strong className="font-bold">PS: </strong>
            <em>{prompt}</em>
          </p>
        ) : (
          <p>{prompt}</p>
        )}
      </hgroup>

      <main>{children}</main>
    </>
  );
}
