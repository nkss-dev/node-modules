export default async function AnnouncementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <hgroup>
        <h1>Announcements</h1>
        <p>
          Check out all the latest announcements fetched directly from{' '}
          <a className="hyperlink" href="https://nitkkr.ac.in/?page_id=621" target="_blank">
            here
          </a>
        </p>
        <hr />
        <p>
          <small>
            With the v2 release, this page will be converted into an events
            dashboard which will contain all the fun stuff going around in the
            college along with the current academic announcements; this includes
            events hosted by clubs, external participation opportunities, etc.
            So, stay tuned!!
          </small>
        </p>
      </hgroup>

      <br />

      <main>{children}</main>
    </>
  );
}
