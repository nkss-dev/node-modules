import { Metadata } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import Link from 'next/link';

import DefaultLayout from '../../../components/default-layout';
import RenderMarkdown from '../../../components/render-markdown';
import { fetcher } from '../../../utils/fetcher';

export const fetchCache = 'default-no-store';

export async function generateMetadata({
  params,
}: {
  params: { code: string };
}): Promise<Metadata> {
  const { code } = params;
  const course: Course = await fetcher(
    `https://api.nksss.live/courses/${code}`
  );

  const description = `The objectives of this course are:\n\n- ${course.objectives.join(
    '\n- '
  )}`;

  return {
    description: description,
    title: course.title,

    openGraph: {
      title: course.title,
      description: description,
      url: `https://nksss.live/courses/${code}`,
    },
  };
}

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
    <DefaultLayout
      title={course.title}
      prompt="This page will soon contain a link to notes, past papers and reference books."
    >
      <table className="w-full">
        <tbody>
          <tr className="flex flex-row flex-wrap justify-between">
            <td className="align-top basis-0 border-none grow min-w-[60%] shrink-0">
              <table>
                <tbody>
                  <tr>
                    <th className="align-top border-none text-right">Code:</th>
                    <td className="border-none text-left">{course.code}</td>
                  </tr>

                  {course.specifics.length == 1 ? (
                    <tr>
                      <th className="align-top border-none text-right">
                        Credits:
                      </th>
                      <td className="border-none text-left">
                        <pre>
                          <u className="no-underline" title="Lecture credits">
                            {course.specifics[0].credits[0]}
                            <sub>L</sub>
                          </u>
                          {' + '}
                          <u className="no-underline" title="Tutorial credits">
                            {course.specifics[0].credits[1]}
                            <sub>T</sub>
                          </u>
                          {' + '}
                          <u className="no-underline" title="Practical credits">
                            {course.specifics[0].credits[2]}
                            <sub>P</sub>
                          </u>
                          {' = '}
                          <u className="no-underline" title="Total credits">
                            {course.specifics[0].credits[3]}
                          </u>
                        </pre>
                      </td>
                    </tr>
                  ) : (
                    <></>
                  )}

                  <tr>
                    <th className="align-top border-none text-right">
                      Prerequisites:
                    </th>
                    <td className="border-none text-left">
                      {course.prereq.length > 0 ? (
                        <ul>
                          {course.prereq.map((prereq, index) => (
                            <li
                              className="list-disclosure-closed ml-4"
                              key={index}
                            >
                              <Link href={`/courses/${prereq}`}>{prereq}</Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <>None</>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <th className="align-top border-none text-right">
                      Objectives:
                    </th>
                    <td className="border-none text-left">
                      <ul>
                        {course.objectives.map(
                          (objective: string, index: number) => (
                            <li
                              className="list-disclosure-closed mb-2 ml-4"
                              key={index}
                            >
                              {objective}
                            </li>
                          )
                        )}
                      </ul>
                    </td>
                  </tr>

                  <tr>
                    <th className="align-top border-none text-right">Type:</th>
                    <td className="border-none text-left">{course.kind}</td>
                  </tr>
                </tbody>
              </table>
            </td>

            {course.specifics.length > 1 ? (
              <td className="border-none mx-auto">
                <table className="border-2 highlightCol">
                  <caption>Credit Distribution</caption>

                  <thead>
                    <tr>
                      <th>Branch</th>
                      {course.specifics.map(({ branch }, index) => {
                        return (
                          <th className="highlightCol" key={index}>
                            {branch}
                          </th>
                        );
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
                              return (
                                <td className="highlightCol" key={mapIndex}>
                                  {value}
                                </td>
                              );
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
                        return (
                          <td className="highlightCol" key={index}>
                            {credits[3]}
                          </td>
                        );
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
      <ol className="ml-8" id="customList">
        {courseContent.map((unit, index) => {
          return (
            <li
              className="before:font-bold before:text-2xl mt-4"
              key={index}
              li-before-text="Unit "
              li-after-text=": "
            >
              <article className="markdown-list">
                <RenderMarkdown {...unit} />
              </article>
            </li>
          );
        })}
      </ol>

      <h2>Reference Books</h2>
      <ul className="mb-8">
        {course.book_names.map((book_name, index) => (
          <li className="list-disclosure-closed mb-2 ml-8" key={index}>
            {book_name}
          </li>
        ))}
      </ul>

      <h2>Outcomes</h2>
      <ul className="mb-8">
        {course.outcomes.map((outcome, index) => (
          <li className="list-disclosure-closed mb-2 ml-8" key={index}>
            {outcome}
          </li>
        ))}
      </ul>
    </DefaultLayout>
  );
}
