import DefaultLayout from '../../components/default-layout';

export default async function AnnouncementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DefaultLayout
      title="Announcements"
      description={
        <>
          Check out all the latest announcements fetched directly from{' '}
          <a href="https://nitkkr.ac.in/?page_id=621" target="_blank">
            here
          </a>
          .
        </>
      }
      prompt="As part of our next major release, this page will be converted into an events dashboard which will contain all the fun stuff going around in the college along with the current academic announcements; this includes events hosted by clubs, external participation opportunities, etc. So, stay tuned!!"
      alert={true}
    >
      {children}
    </DefaultLayout>
  );
}
