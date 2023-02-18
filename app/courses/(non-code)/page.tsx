'use client';

import useSWR from 'swr';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Chip, Stack } from '@mui/material';

import ContactInfo from '../../../components/contact';
import { fetcher } from '../../../utils/fetcher';

const branches = ['CE', 'CS', 'EC', 'EE', 'IT', 'ME', 'PI'] as const;
const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'] as const;

export default function CoursesPage() {
  const {
    data: courses,
    isLoading,
    error,
  }: { data: Course[] | undefined; isLoading: boolean; error: any } = useSWR(
    'https://api.nksss.live/courses',
    fetcher
  );
  if (error) console.error(error);

  const [branch, setBranch] = useState<Branch>();
  const [semester, setSemester] = useState<Semester>();
  const [filteredCourses, setFilteredCourses] = useState<Array<Course>>([]);

  useEffect(() => {
    if (branch && semester && courses) {
      setFilteredCourses(
        courses.filter((course) =>
          course.specifics.some(
            (specific) =>
              specific.branch == branch && specific.semester == semester
          )
        )
      );
    }
  }, [branch, semester, isLoading]);

  const getCredits = (specifics: Array<Specifics>) => {
    var credits: Array<number> = [];
    specifics.map((specific) => {
        if (specific.branch == branch && specific.semester == semester)
        credits = specific.credits;
    });
    return credits;
  };

  return (
    <>
      <table className="w-full">
        <tbody>
          <tr className="flex flex-row justify-evenly">
            <td className="border-none w-2/5">
              <fieldset className="p-2 border-2 rounded border-palette-400">
                <legend className="px-2">Choose your branch</legend>

                <Stack
                  direction="row"
                  spacing={4}
                  className="flex flex-row flex-wrap justify-center"
                >
                  {branches.map((value: Branch) => {
                    const isSelected = value === branch;
                    return (
                      <Chip
                        className={
                          'text-palette-100 hover:bg-palette-400' +
                          (isSelected ? ' bg-palette-400' : '')
                        }
                        label={value}
                        onClick={() => {
                          setBranch(value);
                        }}
                        variant={isSelected ? 'filled' : 'outlined'}
                      />
                    );
                  })}
                </Stack>
              </fieldset>
            </td>

            <td className="border-none w-2/5">
              <fieldset className="p-2 border-2 rounded border-palette-400">
                <legend className="px-2">Choose your semester</legend>

                <Stack
                  direction="row"
                  spacing={4}
                  className="flex flex-row flex-wrap justify-center"
                >
                  {semesters.map((value: Semester) => {
                    const isSelected = value === semester;
                    return (
                      <Chip
                        className={
                          'text-palette-100 hover:bg-palette-400' +
                          (isSelected ? ' bg-palette-400' : '')
                        }
                        label={value}
                        onClick={() => {
                          setSemester(value);
                        }}
                        variant={isSelected ? 'filled' : 'outlined'}
                      />
                    );
                  })}
                </Stack>
              </fieldset>
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <br />

      {!isLoading && (branch && semester) ? (
        filteredCourses.length ? (
          <table className='border-2 w-full'>
            <thead>
              <tr>
                <th rowSpan={2}>Code</th>
                <th rowSpan={2}>Title</th>
                <th rowSpan={2}>Prerequisites</th>
                <th colSpan={4}>Credits</th>
                <th rowSpan={2}>Type</th>
              </tr>
              <tr>
                <th>Lecture</th>
                <th>Tutorial</th>
                <th>Practical</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {filteredCourses.map((course: Course, index) => {
                const credits = getCredits(course.specifics);
                return (
                  <tr key={index} id="rowLink">
                    <td>
                      <Link href={`/courses/${course.code}`}>
                        {course.code}
                      </Link>
                    </td>
                    <td>{course.title}</td>
                    <td>{course.prereq}</td>
                    <td>{credits ? credits[0] : 0}</td>
                    <td>{credits ? credits[1] : 0}</td>
                    <td>{credits ? credits[2] : 0}</td>
                    <td>{credits ? credits[3] : 0}</td>
                    <td>{course.kind}</td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <th />
              <th />
              <th />
              <th>
                {filteredCourses.reduce(
                  (sum, { specifics }) => sum + getCredits(specifics)[0],
                  0
                )}
              </th>
              <th>
                {filteredCourses.reduce(
                  (sum, { specifics }) => sum + getCredits(specifics)[1],
                  0
                )}
              </th>
              <th>
                {filteredCourses.reduce(
                  (sum, { specifics }) => sum + getCredits(specifics)[2],
                  0
                )}
              </th>
              <th>
                {filteredCourses.reduce(
                  (sum, { specifics }) => sum + getCredits(specifics)[3],
                  0
                )}
              </th>
              <th />
            </tfoot>
          </table>
        ) : (
          <>
            <p>
              No course found for the matching filters. Don't worry, we will add
              them soon! If you want a particular course / set of courses added
              sooner, please contact us at
            </p>
            {ContactInfo()}
          </>
        )
      ) : (
        <></>
      )}
    </>
  );
}
