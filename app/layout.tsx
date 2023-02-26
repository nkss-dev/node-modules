import '../styles/custom-list.css';
import '../styles/globals.css';
import '../styles/highlight-col.css';
import '../styles/markdown-list.css';
import '../styles/row-link.css';
import Breadcrumb from './breadcrumb';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <noscript>You need to enable JavaScript to run this app</noscript>

        <Breadcrumb />

        <section className="container">{children}</section>

        {/* TODO: Implement footer */}
        <footer>
          <br />
          <br />
        </footer>
      </body>
    </html>
  );
}
