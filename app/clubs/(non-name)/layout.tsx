export default async function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <hgroup>
        <h1>Clubs</h1>
        <p>
          Check out all the official/unofficial clubs and societies of NIT-KKR
        </p>
        <hr />
        <p>
          <small>
            With the v1 release, this page will contain the full list <em>and</em> the details of every club!
          </small>
        </p>
      </hgroup>
      <main>{children}</main>
    </>
  );
}
