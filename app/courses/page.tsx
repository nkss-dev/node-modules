import Link from 'next/link';

type Course = {
  code: string;
  title: string;
  prereq: Array<string>;
  kind: string;
  objectives: Array<string>;
  content: Array<string>;
  bookNames: Array<string>;
  outcomes: Array<string>;
};

const fetchCourses = async () => {
  try {
    return fetch('https://api.nksss.live/courses')
      .then((response) => response.json())
      .then((json) => json.data);
  } catch {
    // TODO: Handle error
    return [];
  }
};

export default async function CoursesPage() {
  const courses: Array<Course> = await fetchCourses();

  return (
    <div>
      <hgroup>
        <h1>Courses</h1>
        <p>
          Choose your branch and semester below to display the respective
          courses!
        </p>
        <hr />
        <p>
          <small>
            This page will soon, with the v1 release, display as many of the
            400+ courses that our college offers for their B. Tech. degree.
          </small>
        </p>
      </hgroup>

      <main>
        <ul>
          {courses.map((course: Course) => {
            return <CourseCard key={course.code} course={course} />;
          })}
        </ul>
      </main>
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/${course.code}`}>
      <li>
        <h2>{course.title}</h2>
        <h4>Course Code: {course.code}</h4>
        <h4>Prerequisites: {course.prereq}</h4>
        <h4>Course Type: {course.kind}</h4>
      </li>
    </Link>
  );
}
