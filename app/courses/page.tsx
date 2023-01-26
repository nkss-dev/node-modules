import FilteredCourses from './components/filtered-courses';

async function fetchCourses() {
  const response = await fetch(`https://api.nksss.live/courses`);
  const courses = await response.json();
  return courses.data as Array<Course>;
}

export default async function CoursesPage() {
  const courses = await fetchCourses();

  return <FilteredCourses courses={courses} />;
}
