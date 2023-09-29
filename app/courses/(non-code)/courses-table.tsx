'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import useIsScreenLessThan from '@/utils/screen-width-check';

export default function CoursesTable({
  branch,
  courses,
  semester,
}: {
  branch: Branch;
  courses: Array<Course>;
  semester: Semester;
}) {
  const isMobile = useIsScreenLessThan(768);
  const [programmeElectives, setProgrammeElectives] = useState<{
    [pool: string]: { courses: Array<Course>; isOpen: boolean };
  }>({});
  // const [electivePools, setElectivePools] = useState<{[pool: string]: boolean}>({})
  useEffect(() => {
    if (!branch || !semester) return;

    const programmeElectives = courses.filter((course) =>
      course.kind.includes('PE')
    );
    const courseTypesToGroup = Array.from(
      new Set(programmeElectives.map((course) => course.kind))
    );
    setProgrammeElectives(() => {
      const electives = courseTypesToGroup.map((pool) => ({
        [pool]: {
          courses: programmeElectives.filter(({ kind }) => kind === pool),
          isOpen: false,
        },
      }));

      return Object.assign({}, ...electives);
    });
  }, [courses]);

  const getCredits = (specifics: Array<Specifics>) => {
    var credits: Array<number> = [];
    specifics.map((specific) => {
      if (specific.branch == branch && specific.semester == semester)
        credits = specific.credits;
    });
    return credits;
  };

  const sumCreditColumn = (column: number) => {
    var poolsFound = Object.keys(programmeElectives).map((pool) => ({
      pool: pool,
      found: false,
    }));

    return courses.reduce((sum, { kind, specifics }) => {
      const poolIndex = poolsFound.findIndex(({ pool }) => pool === kind);
      if (poolIndex != -1 && poolsFound[poolIndex].found) {
        return sum;
      } else {
        if (poolIndex !== -1) {
          poolsFound[poolIndex].found = true;
        }
        return sum + getCredits(specifics)[column];
      }
    }, 0);
  };

  return (
    <>
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
                {courses.some(({ prereq }) => prereq.length > 0) ? (
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
          {courses
            .filter((course) => !course.kind.includes('PE'))
            .map((course: Course, index) => {
              const credits = getCredits(course.specifics);
              return (
                <tr className="hover:bg-palette-500" key={index} id="rowLink">
                  <td>
                    <Link href={`/courses/${course.code}`}>{course.code}</Link>
                  </td>
                  <td className="text-start">{course.title}</td>

                  {isMobile ? (
                    <td>{credits[3]}</td>
                  ) : (
                    <>
                      {courses.some(({ prereq }) => prereq.length > 0) ? (
                        <td>
                          <ul>
                            {course.prereq.map((prereq, index) => (
                              <li key={index}>{prereq}</li>
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

          {Object.keys(programmeElectives).map((pool, index) => {
            const course = courses.find((course) => course.kind === pool);
            if (!course) return;
            const credits = getCredits(course.specifics);

            return (
              <tr className="hover:bg-palette-500" id="rowLink" key={index}>
                <td>
                  <a href={`#PE${index + 1}`} />
                </td>
                <td className="text-start">{`Programme Elective ${
                  index + 1
                }`}</td>

                {isMobile ? (
                  <td>{credits[3]}</td>
                ) : (
                  <>
                    {courses.some(({ prereq }) => prereq.length > 0) ? (
                      <td />
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
                {courses.some(({ prereq }) => prereq.length > 0) ? (
                  <th />
                ) : (
                  <></>
                )}
                <th>{sumCreditColumn(0)}</th>
                <th>{sumCreditColumn(1)}</th>
                <th>{sumCreditColumn(2)}</th>
              </>
            )}
            <th>{sumCreditColumn(3)}</th>
            {isMobile ? <></> : <th />}
          </tr>
        </tfoot>
      </table>

      <ElectivesTable programmeElectives={programmeElectives} />
    </>
  );
}

const ElectivesTable = ({
  programmeElectives,
}: {
  programmeElectives: {
    [pool: string]: { courses: Array<Course>; isOpen: boolean };
  };
}) => {
  return (
    <>
      {Object.keys(programmeElectives).map((pool, index) => {
        return (
          <>
            <h4
              className="mb-4 mt-8"
              id={`PE${index + 1}`}
            >{`List of Programme Electives ${index + 1}`}</h4>
            <table>
              <thead>
                <th>Code</th>
                <th>Title</th>
                <th>Prerequisites</th>
              </thead>

              <tbody>
                {programmeElectives[pool].courses.map((course, innerIndex) => {
                  return (
                    <tr
                      className="hover:bg-palette-500"
                      id="rowLink"
                      key={innerIndex}
                    >
                      <td>
                        <Link href={`/courses/${course.code}`}>
                          {course.code}
                        </Link>
                      </td>
                      <td className="text-start">{course.title}</td>
                      <td>
                        <ul>
                          {course.prereq.map((prereq, index) => (
                            <li key={index}>{prereq}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        );
      })}
    </>
  );
};
