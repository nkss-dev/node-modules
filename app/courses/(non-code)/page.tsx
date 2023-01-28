'use client';

import useSWR from 'swr';
import { Fragment, useEffect, useState } from 'react';
import ContactInfo from '../../components/contact';
import CourseCard from '../components/course-card';

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

  return (
    <>
      {isLoading || !(branch && semester) ? (
        <form>
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
        </form>
      ) : (
        <>
          {filteredCourses.length ? (
            <ul>
              {filteredCourses.map((course: Course) => {
                return <CourseCard course={course} key={course.code} />;
              })}
            </ul>
          ) : (
            <>
              <p>
                No course found for the matching filters. Don't worry, we will
                add them soon! If you want a particular course / set of courses
                added sooner, please contact us at
              </p>{' '}
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
