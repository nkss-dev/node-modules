import { Metadata } from 'next';

import ClubMemberCard from '../../../components/club-member-card';
import DefaultLayout from '../../../components/default-layout';
import RenderIcon from '../../../components/render-icon';
import { fetcher } from '../../../utils/fetcher';

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const { name } = params;
  const club: Club = await fetcher(`/clubs/${name}`);

  return {
    description: club.description.about_us,
    title: club.name,

    openGraph: {
      title: club.name,
      description: club.description.about_us,
      url: 'https://node-modules.up.railway.app/clubs',
    },
  };
}

export async function generateStaticParams() {
  const clubs: Array<ClubBasic> = await fetcher('/clubs');

  return clubs.map((club: ClubBasic) => ({
    name: club.short_name,
  }));
}

export default async function ClubPage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;
  const club: Club = await fetcher(`/clubs/${name}`);

  return (
    <DefaultLayout title={club.name} prompt={club.short_description}>
      <hgroup className="mb-6 sm:mb-7 md:mb-8">
        <h2>Join Us</h2>
        <p>{club.description.why_us}</p>
      </hgroup>

      <hgroup className="mb-6 sm:mb-7 md:mb-8">
        <h2>About Us</h2>
        <p>{club.description.about_us}</p>
      </hgroup>

      <h3>Meet our post holders</h3>
      <ul className="flex flex-row flex-wrap gap-4 mb-6">
        {club.admins.map((admin, index) => (
          <li key={index}>
            <ClubMemberCard
              fullName={admin.name}
              href={`/users/${admin.roll}`}
              imageSrc={`users/${admin.roll}`}
              position={admin.position}
            />
          </li>
        ))}
      </ul>

      <h3>Our public accounts</h3>
      <ul className="flex flex-row flex-wrap gap-4">
        {club.socials.map(({ platform, link }, index) => (
          <li key={index}>
            <a href={link} target="_blank">
              <RenderIcon
                className="h-5 w-5 sm:h-7 sm:w-7 md:h-9 md:w-9"
                platform={platform}
              />
            </a>
          </li>
        ))}
      </ul>
    </DefaultLayout>
  );
}
