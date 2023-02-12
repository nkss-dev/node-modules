export default async function ClubsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <hgroup>
        <h1>Clubs</h1>
        <p>An overview all the clubs and societies of NIT-KKR</p>
        <hr />
      </hgroup>
      <main>{children}</main>
    </>
  );
}
