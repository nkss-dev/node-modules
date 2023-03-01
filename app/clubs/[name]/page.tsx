import { Metadata } from 'next';
import DefaultLayout from '../../../components/default-layout';
import { fetcher } from '../../../utils/fetcher';

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const { name } = params;
  const club: Club = await fetcher(`https://api.nksss.live/clubs/${name}`);

  return {
    description: club.description.about_us,
    title: club.name,

    openGraph: {
      title: club.name,
      description: club.description.about_us,
      url: 'https://nksss.live/clubs',
    },
  };
}

export async function generateStaticParams() {
  const clubsResponse = await fetch('https://api.nksss.live/clubs');
  const clubs = await clubsResponse.json();

  return clubs.data.map((club: ClubBasic) => ({
    name: club.short_name,
  }));
}

export default async function ClubPage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;
  const club: Club = await fetcher(`https://api.nksss.live/clubs/${name}`);

  return (
    <DefaultLayout
      title={club.name}
      prompt={`This page will soon contain a full description of ${name}`}
    >
      <></>
    </DefaultLayout>
  );
}
