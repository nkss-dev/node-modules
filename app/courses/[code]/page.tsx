import { serialize } from 'next-mdx-remote/serialize';
import { Fragment } from 'react';

import RenderMarkdown from '../../../components/render-markdown';
import { fetcher } from '../../../utils/fetcher';

export async function generateStaticParams() {
  const courses: Array<Course> = await fetcher(
    'https://api.nksss.live/courses'
  );

  return courses.map((course) => ({
    code: course.code,
  }));
}

async function convertCourseContent(content: string[]) {
  return await Promise.all(
    content.map(async (unit) => {
      return await serialize(unit);
    })
  );
}

export default async function CoursePage({ params, searchParams }: any) {
  const { code } = params;
  const course: Course = await fetcher(
    `https://api.nksss.live/courses/${code}`
  );
  const courseContent = await convertCourseContent(course.content);

  return (
    <>
      <hgroup>
        <h1>{course.title}</h1>
        <hr />
        <p>
          This page will soon contain a link to notes, past papers and reference
          books.
        </p>
      </hgroup>

      <br />

      <main>
        <table>
          <tbody>
            <tr>
              <td className="border-none align-top">
                <table>
                  <tbody>
                    <tr>
                      <th className="align-top border-none text-right">
                        Code:
                      </th>
                      <td className="border-none text-left">{course.code}</td>
                    </tr>

                    <tr>
                      <th className="align-top border-none text-right">
                        Prerequisites:
                      </th>
                      <td className="border-none text-left">
                        {course.prereq.length > 0 ? (
                          <ul>
                            {course.prereq.map((prereq, index) => (
                              <li key={index}>{prereq}</li>
                            ))}
                          </ul>
                        ) : (
                          <>None</>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <th className="align-top border-none text-right">
                        Type:
                      </th>
                      <td className="border-none text-left">{course.kind}</td>
                    </tr>

                    {course.specifics.length == 1 ? (
                      <tr>
                        <th className="align-top border-none text-right">
                          Credits:
                        </th>
                        <td className="border-none text-left">
                          <p>
                            <u title="Lecture credits">
                              L{course.specifics[0].credits[0]}
                            </u>
                            ,{' '}
                            <u title="Tutorial credits">
                              T{course.specifics[0].credits[1]}
                            </u>
                            ,{' '}
                            <u title="Practical credits">
                              P{course.specifics[0].credits[2]}
                            </u>
                            ,{' '}
                            <u title="Total credits">
                              T{course.specifics[0].credits[3]}
                            </u>
                          </p>
                          <p className="mb-0">
                            These credits are for the{' '}
                            <b>{course.specifics[0].branch}</b> branch and
                            semester <b>{course.specifics[0].semester}</b>.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      <></>
                    )}

                    <tr>
                      <th className="align-top border-none text-right">
                        Objectives:
                      </th>
                      <td className="border-none text-left">
                        <ul>
                          {course.objectives.map(
                            (objective: string, index: number) => (
                              <li
                                className="list-disclosure-closed list-inside"
                                key={index}
                              >
                                {objective}
                              </li>
                            )
                          )}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>

              {course.specifics.length > 1 ? (
                <td className="border-none">
                  <table className="border-2 highlightCol">
                    <caption>Credit Distribution</caption>

                    <thead>
                      <tr>
                        <th>Branch</th>
                        {course.specifics.map(({ branch }, index) => {
                          return <th className='highlightCol' key={index}>{branch}</th>;
                        })}
                      </tr>
                    </thead>

                    <tbody>
                      {['Semester', 'Lecture', 'Practical', 'Tutorial'].map(
                        (key, arrayIndex) => {
                          return (
                            <tr key={arrayIndex}>
                              <th>{key}</th>
                              {course.specifics.map((specific, mapIndex) => {
                                var value;
                                switch (key) {
                                  case 'Semester':
                                    value = specific.semester;
                                    break;
                                  case 'Lecture':
                                    value = specific.credits[0];
                                    break;
                                  case 'Practical':
                                    value = specific.credits[1];
                                    break;
                                  case 'Tutorial':
                                    value = specific.credits[2];
                                    break;
                                }
                                return <td className='highlightCol' key={mapIndex}>{value}</td>;
                              })}
                            </tr>
                          );
                        }
                      )}
                    </tbody>

                    <tfoot>
                      <tr>
                        <th>Total</th>
                        {course.specifics.map(({ credits }, index) => {
                          return <td className='highlightCol' key={index}>{credits[3]}</td>;
                        })}
                      </tr>
                    </tfoot>
                  </table>
                </td>
              ) : (
                <></>
              )}
            </tr>
          </tbody>
        </table>

        <h2>Content</h2>
        <ol className='ml-8' id="customList">
          {courseContent.map((unit, index) => {
            return (
              <Fragment key={index}>
                <li
                  className="before:font-bold before:text-2xl"
                  li-before-text="Unit "
                  li-after-text=": "
                >
                  <div className="markdown-list">
                    <RenderMarkdown {...unit} />
                  </div>
                </li>
                <br />
              </Fragment>
            );
          })}
        </ol>

        <h2>Reference Books</h2>
        <ul>
          {course.book_names.map((book_name, index) => (
            <li className="list-disclosure-closed ml-8" key={index}>
              {book_name}
            </li>
          ))}
        </ul>

        <h2>Outcomes</h2>
        <ul>
          {course.outcomes.map((outcome, index) => (
            <li className="list-disclosure-closed ml-8" key={index}>
              {outcome}
            </li>
          ))}
        </ul>
      </main>

      <br />
      <br />
    </>
  );
}
