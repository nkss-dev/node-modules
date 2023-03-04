'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Balancer from 'react-wrap-balancer';
import useSWR from 'swr';

import Chip from '../../../components/chip';
import { fetcher } from '../../../utils/fetcher';
import useIsScreenLessThan from '../../../utils/screen-width-check';

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

  const isMobile = useIsScreenLessThan(768);
  const [branch, setBranch] = useState<Branch>();
  const [semester, setSemester] = useState<Semester>();
  const [filteredCourses, setFilteredCourses] = useState<Array<Course>>([]);

  useEffect(() => {
    if (!courses) return;

    setFilteredCourses(
      courses.filter((course) => {
        if (!branch && !semester) {
          return true;
        } else if (branch && !semester) {
          return course.specifics.some((specific) => specific.branch == branch);
        } else if (!branch && semester) {
          return course.specifics.some(
            (specific) => specific.semester == semester
          );
        } else {
          return course.specifics.some(
            (specific) =>
              specific.branch == branch && specific.semester == semester
          );
        }
      })
    );
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
          <tr className="flex flex-row justify-between gap-4">
            <td className="border-none px-0">
              <fieldset className="p-2 sm:p-3 md:p-4 border-2 rounded border-palette-400">
                <legend className="px-2">Choose your branch</legend>

                <Balancer>
                  <section className="flex flex-row flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center">
                    {branches.map((value: Branch, index) => {
                      const isSelected = value === branch;
                      return (
                        <Chip
                          key={index}
                          label={value}
                          onClick={() => {
                            if (isSelected) {
                              setBranch(undefined);
                            } else {
                              setBranch(value);
                            }
                          }}
                          isSelected={isSelected}
                        />
                      );
                    })}
                  </section>
                </Balancer>
              </fieldset>
            </td>

            <td className="border-none px-0">
              <fieldset className="p-2 sm:p-3 md:p-4 border-2 rounded border-palette-400">
                <legend className="px-2">Choose your semester</legend>

                <Balancer>
                  <section className="flex flex-row flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center">
                    {semesters.map((value: Semester, index) => {
                      const isSelected = value === semester;
                      return (
                        <Chip
                          key={index}
                          label={value}
                          onClick={() => {
                            if (isSelected) {
                              setSemester(undefined);
                            } else {
                              setSemester(value);
                            }
                          }}
                          isSelected={isSelected}
                        />
                      );
                    })}
                  </section>
                </Balancer>
              </fieldset>
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <br />

      {!isLoading && !(branch && semester) && filteredCourses.length > 0 ? (
        <>
          {branch || semester ? <></> : <h2>All courses</h2>}
          {branch ? <h2>All courses in the {branch} branch</h2> : <></>}
          {semester ? <h2>All courses in semester {semester}</h2> : <></>}

          <ul>
            {filteredCourses.map((course) => {
              return (
                <Link href={`/courses/${course.code}`} key={course.code}>
                  <li className="list-disclosure-closed ml-4">
                    <h4>
                      {course.code}:{' '}
                      <span className="font-normal">{course.title}</span>
                    </h4>
                  </li>
                </Link>
              );
            })}
          </ul>
        </>
      ) : (
        <></>
      )}

      {!isLoading && branch && semester ? (
        filteredCourses.length ? (
          <table className="border-2 w-full">
            <thead>
              {isMobile ? (
                <tr>
                  <th>Code</th>
                  <th>Title</th>
                  <th>Credits</th>
                </tr>
              ) : (
                <>
                  <tr>
                    <th rowSpan={2}>Code</th>
                    <th rowSpan={2}>Title</th>
                    {filteredCourses.some(({ prereq }) => prereq.length > 0) ? (
                      <th rowSpan={2}>Prerequisites</th>
                    ) : (
                      <></>
                    )}
                    <th colSpan={4}>Credits</th>
                    <th rowSpan={2}>Type</th>
                  </tr>
                  <tr>
                    <th>Lecture</th>
                    <th>Tutorial</th>
                    <th>Practical</th>
                    <th>Total</th>
                  </tr>
                </>
              )}
            </thead>

            <tbody>
              {filteredCourses.map((course: Course, index) => {
                const credits = getCredits(course.specifics);
                return (
                  <tr className="hover:bg-palette-500" key={index} id="rowLink">
                    <td>
                      <Link href={`/courses/${course.code}`}>
                        {course.code}
                      </Link>
                    </td>
                    <td className="text-start">{course.title}</td>

                    {isMobile ? (
                      <>
                        <td>{credits[3]}</td>
                      </>
                    ) : (
                      <>
                        {filteredCourses.some(
                          ({ prereq }) => prereq.length > 0
                        ) ? (
                          <td>
                            <ul>
                              {course.prereq.map((prereq, index) => (
                                <li key={index}>
                                  {prereq}
                                </li>
                              ))}
                            </ul>
                          </td>
                        ) : (
                          <></>
                        )}
                        <td>{credits ? credits[0] : 0}</td>
                        <td>{credits ? credits[1] : 0}</td>
                        <td>{credits ? credits[2] : 0}</td>
                        <td>{credits ? credits[3] : 0}</td>
                        <td>{course.kind}</td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr>
                <th />
                <th />
                {isMobile ? (
                  <></>
                ) : (
                  <>
                    {filteredCourses.some(({ prereq }) => prereq.length > 0) ? (
                      <th />
                    ) : (
                      <></>
                    )}
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
                  </>
                )}
                <th>
                  {filteredCourses.reduce(
                    (sum, { specifics }) => sum + getCredits(specifics)[3],
                    0
                  )}
                </th>
                {isMobile ? <></> : <th />}
              </tr>
            </tfoot>
          </table>
        ) : (
          <p>
            <Balancer>
              No courses were found for the given filters. Don't worry, we will
              add them soon! If you want a particular course or a set of courses
              added sooner, please contact us at any our handles mentioned at
              the bottom of this page!
            </Balancer>
          </p>
        )
      ) : (
        <></>
      )}
    </>
  );
}
