import { Fragment } from 'react';

import ClubCard from '../../components/club-card';
import { fetcher } from '../../utils/fetcher';

const clubCategories = [
  'Cultural Club',
  'Technical Club',
  'Technical Society',
  'Magazine',
  'Crew',
  'Committee',
] as const;

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
  const clubs: Array<ClubBasic> = await fetcher('https://api.nksss.live/clubs');

  return (
    <>
      <hgroup>
        <h1>Clubs</h1>
        <p>An overview all the clubs and societies of NIT-KKR</p>
      </hgroup>

      <hr />

      <main>
        {clubCategories.map((category: ClubCategory, categoryIndex) => {
          return (
            <Fragment key={categoryIndex}>
              <br />
              <h2>{category}</h2>
              <br />
              <ol className="flex flex-row flex-wrap gap-4">
                {getCategorisedClubs(category, clubs)}
              </ol>
            </Fragment>
          );
        })}
      </main>
    </>
  );
}
