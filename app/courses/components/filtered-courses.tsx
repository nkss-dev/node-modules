'use client';

import { Fragment, useEffect, useState } from 'react';
import ContactInfo from '../../components/contact';
import CourseCard from './course-card';

const branches = ['CE', 'CS', 'EC', 'EE', 'IT', 'ME', 'PI'] as const;
const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'] as const;

export default function FilteredCourses({
  courses,
}: {
  courses: Array<Course>;
}) {
  const [branch, setBranch] = useState<Branch>();
  const [semester, setSemester] = useState<Semester>();
  const [showFilters, setShowFilters] = useState(true);
  const [filteredCourses, setFilteredCourses] = useState<Array<Course>>([]);

  useEffect(() => {
    setFilteredCourses(
      courses.filter((course) =>
        course.specifics.some(
          (specific) =>
            specific.branch == branch &&
            semester &&
            specific.semester == semester
        )
      )
    );
    branch && semester && setShowFilters(false);
  }, [branch, semester]);

  return (
    <>
      {showFilters ? (
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
              setShowFilters(true);
            }}
          >
            Try another branch or semester
          </button>
        </>
      )}
    </>
  );
}
