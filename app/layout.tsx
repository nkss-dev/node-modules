import '../styles/custom-list.css'
import '../styles/globals.css'
import '../styles/row-link.css'

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
        {children}
      </body>
    </html>
  );
}
