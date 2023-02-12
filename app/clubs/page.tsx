import { Fragment } from 'react';

import ClubCard from '../components/club-card';

const clubCategories = [
  'Cultural Club',
  'Magazine',
  'Technical Club',
  'Technical Society',
] as const;

async function fetchClubs() {
  const clubsResponse = await fetch('https://api.nksss.live/clubs');
  return (await clubsResponse.json()).data;
}

const getCategorisedClubs = (
  category: ClubCategory,
  clubs: Array<ClubBasic>
) => {
  const filteredClubs = clubs.filter((club) => club.category === category);

  if (filteredClubs.length === 0)
    return <p>No club found for the {category} category</p>;

  return filteredClubs.map((club, index) => (
    <li key={index}>
      <ClubCard club={club} />
    </li>
  ));
};

export default async function ClubsPage() {
  const clubs: Array<ClubBasic> = await fetchClubs();

  return (
    <>
      <hgroup>
        <h1>Clubs</h1>
        <p>An overview all the clubs and societies of NIT-KKR</p>
        <hr />
      </hgroup>

      <main>
        {clubCategories.map((category: ClubCategory, categoryIndex) => {
          return (
            <Fragment key={categoryIndex}>
              <h2>{category}</h2>
              <ol>
                {getCategorisedClubs(category, clubs)}
              </ol>
            </Fragment>
          );
        })}
      </main>
    </>
  );
}
