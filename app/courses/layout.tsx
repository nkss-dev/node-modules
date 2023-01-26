export default async function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <hgroup>
        <h1>Courses</h1>
        <p>
          Choose your branch and semester below to display the respective
          courses!
        </p>
        <hr />
        <p>
          <small>
            This page will soon, with the v1 release, display as many of the
            400+ courses that our college offers for their B. Tech. degree.
          </small>
        </p>
      </hgroup>
      <main>{children}</main>
    </>
  );
}
