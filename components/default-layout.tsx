import Balancer from 'react-wrap-balancer';

export default function DefaultLayout({
  title,
  description,
  prompt,
  alert = false,
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
      <hgroup className="mb-6">
        <h1>
          <Balancer>{title}</Balancer>
        </h1>
        <p>{description}</p>

        <hr className="mt-2 mb-2" />

        {alert ? (
          <p className="font-bold text-red-400 underline">
            <em>PS: {prompt}</em>
          </p>
        ) : (
          <p>{prompt}</p>
        )}
      </hgroup>

      <main>{children}</main>
    </>
  );
}
