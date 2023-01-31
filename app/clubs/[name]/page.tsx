export async function generateStaticParams() {
  const clubsResponse = await fetch('https://api.nksss.live/clubs');
  const clubs = await clubsResponse.json();

  return clubs.data.map((club: Club) => ({
    name: club.short_name,
  }));
}

async function fetchClub(name: string) {
  const clubResponse = await fetch(`https://api.nksss.live/clubs/${name}`);
  return (await clubResponse.json()).data;
}

export default async function CourseInfo({ params, searchParams }: any) {
  const { name } = params;
  const club: Club = await fetchClub(name);

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
