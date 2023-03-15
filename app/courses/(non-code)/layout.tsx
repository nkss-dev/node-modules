import DefaultLayout from '../../../components/default-layout';

export const metadata = {
  title: 'Courses',
  description:
    'Check out all the courses with optional branch and semester filters for a better view at the credit distribution.',
};

export default async function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DefaultLayout
      title="Courses"
      description="Choose your branch and semester below to display the respective courses!"
      prompt="We're still in the process of adding the descriptions of more courses! Open electives, viva, project, and lab courses are yet to be added."
      alert={true}
    >
      {children}
    </DefaultLayout>
  );
}
