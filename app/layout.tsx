import { Session } from 'next-auth';
import { headers } from 'next/headers'
import AuthContext from './AuthContext';
import './globals.css'

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(`${process.env.LOCAL_AUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  });

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession(headers().get('cookie') ?? '')
  return (
    <html>
      <head />
      <body>
        <noscript>You need to enable JavaScript to run this app</noscript>
        <AuthContext session={session}>
        {children}
        </AuthContext>
      </body>
    </html>
  );
}
