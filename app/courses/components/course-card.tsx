import Link from 'next/link';

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.code}`}>
      <li>
        <h2>{course.title}</h2>
        <h4>Course Code: {course.code}</h4>
        <h4>Prerequisites: {course.prereq}</h4>
        <h4>Course Type: {course.kind}</h4>
      </li>
    </Link>
  );
}
