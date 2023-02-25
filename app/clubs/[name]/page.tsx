import { fetcher } from "../../../utils/fetcher";

export async function generateStaticParams() {
  const clubsResponse = await fetch('https://api.nksss.live/clubs');
  const clubs = await clubsResponse.json();

  return clubs.data.map((club: ClubBasic) => ({
    name: club.short_name,
  }));
}

export default async function ClubPage({ params, searchParams }: any) {
  const { name } = params;
  const club: Club = await fetcher(`https://api.nksss.live/clubs/${name}`);

  return (
    <>
      <hgroup>
        <h1>{club.name}</h1>
        <hr />
        <p>This page will soon contain a full description of {name}</p>
      </hgroup>

      <main></main>
    </>
  );
}
