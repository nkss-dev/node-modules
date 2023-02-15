import { serialize } from 'next-mdx-remote/serialize';

import RenderMarkdown from '../../components/render-markdown';
import { fetcher } from '../../utils/fetcher';

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

export default async function CourseInfo({ params, searchParams }: any) {
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

      <main>
        <table>
          <tbody>
            <tr>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <th>Code:</th>
                      <td>{course.code}</td>
                    </tr>

                    <tr>
                      <th>Prerequisites:</th>
                      <td>
                        {course.prereq ? (
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
                      <th>Type:</th>
                      <td>{course.kind}</td>
                    </tr>

                    <tr>
                      <th>Objectives</th>
                      <td>
                        <ul>
                          {course.objectives.map(
                            (objective: string, index: number) => (
                              <li key={index}>{objective}</li>
                            )
                          )}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>

              <td>
                <table>
                  <caption>Credit Distribution</caption>

                  <thead>
                    <tr>
                      <th>Branch</th>
                      {course.specifics.map(({ branch }, index) => {
                        return <th key={index}>{branch}</th>;
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
                              return <td key={mapIndex}>{value}</td>;
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
                        return <td key={index}>{credits[3]}</td>;
                      })}
                    </tr>
                  </tfoot>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        <h2>Content</h2>
        <ol>
          {courseContent.map((unit, index) => {
            return (
              <li key={index}>
                <h3>Unit {index + 1}</h3>
                <RenderMarkdown {...unit} />
              </li>
            );
          })}
        </ol>

        <h2>Reference Books</h2>
        <ul>
          {course.book_names.map((book_name, index) => (
            <li key={index}>{book_name}</li>
          ))}
        </ul>

        <h2>Outcomes</h2>
        <ul>
          {course.outcomes.map((outcome, index) => (
            <li key={index}>{outcome}</li>
          ))}
        </ul>
      </main>
    </>
  );
}
