'use client';

import useSWR from 'swr';
import { Fragment, useEffect, useState } from 'react';
import ContactInfo from '../../components/contact';
import Link from 'next/link';

const branches = ['CE', 'CS', 'EC', 'EE', 'IT', 'ME', 'PI'] as const;
const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'] as const;

const fetchCourses = (url: RequestInfo | URL) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => res.data);

export default function CoursesPage() {
  const {
    data: courses,
    isLoading,
    error,
  }: { data: Course[] | undefined; isLoading: boolean; error: any } = useSWR(
    'https://api.nksss.live/courses',
    fetchCourses
  );
  if (error) console.error(error);

  const [branch, setBranch] = useState<Branch>();
  const [semester, setSemester] = useState<Semester>();
  const [credits, setCredits] = useState<Array<number>>();
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

  useEffect(() => {
    if (filteredCourses.length == 0) return;
    setCredits(
      filteredCourses[0].specifics.filter((specific) => {
        if (specific.branch == branch && specific.semester == semester)
          return specific.credits;
      })[0].credits
    );
  }, [filteredCourses]);

  return (
    <>
      {isLoading || !(branch && semester) ? (
        <form>
          <table>
            <tbody>
              <tr>
                <td>
                  <fieldset>
                    <legend>Choose your branch</legend>

                    {branches.map((value: string) => {
                      return (
                        <Fragment key={value}>
                          <input
                            type="radio"
                            id={value}
                            name="branch"
                            value={value}
                            onChange={(e) => {
                              setBranch(e.target.value as Branch);
                            }}
                          />
                          <label htmlFor={value}>{value}</label>
                        </Fragment>
                      );
                    })}
                  </fieldset>
                </td>

                <td>
                  <fieldset>
                    <legend>Choose your semester</legend>

                    {semesters.map((value: Semester) => {
                      return (
                        <Fragment key={value}>
                          <input
                            type="radio"
                            id={value}
                            name="semester"
                            value={value}
                            onChange={(e) => {
                              setSemester(e.target.value as Semester);
                            }}
                          />
                          <label htmlFor={value}>{value}</label>
                        </Fragment>
                      );
                    })}
                  </fieldset>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      ) : (
        <>
          {filteredCourses.length ? (
            <table>
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
                  return (
                    <tr key={index} id="linkRow">
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

              <tfoot>{/* TODO: Add sum of all credits */}</tfoot>
            </table>
          ) : (
            <>
              <p>
                No course found for the matching filters. Don't worry, we will
                add them soon! If you want a particular course / set of courses
                added sooner, please contact us at
              </p>
              {ContactInfo()}
            </>
          )}

          <button
            onClick={() => {
              setBranch(undefined);
              setSemester(undefined);
            }}
          >
            Try another branch or semester
          </button>
        </>
      )}
    </>
  );
}
