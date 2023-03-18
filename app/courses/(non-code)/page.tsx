'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Balancer from 'react-wrap-balancer';
import useSWR from 'swr';

import Chip from '../../../components/chip';
import { fetcher } from '../../../utils/fetcher';
import CoursesTable from './courses-table';

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
    if (!courses) return;

    setFilteredCourses(
      courses
        .filter((course) => {
          if (!branch && !semester) {
            return true;
          } else if (branch && !semester) {
            return course.specifics.some(
              (specific) => specific.branch == branch
            );
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
        .sort(({ code: codePrev }, { code: codeNext }) =>
          Number(codePrev > codeNext)
        )
    );
  }, [branch, semester, isLoading]);

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
          <CoursesTable
            branch={branch}
            courses={filteredCourses}
            semester={semester}
          />
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
