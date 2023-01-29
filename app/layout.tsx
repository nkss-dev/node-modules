import './globals.css'

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
