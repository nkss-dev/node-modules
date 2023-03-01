import Balancer from 'react-wrap-balancer';
import DefaultLayout from '../../../components/default-layout';

export const metadata = {
  title: 'Courses',
  description:
    "Check out all the courses with optional branch and semester filters for a better view at the credit distribution.",
};

export default async function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DefaultLayout
      title='Courses'
      description='Choose your branch and semester below to display the respective courses!'
      prompt='This page will soon, with the v1 release, display as many of the 400+ courses that our college offers for their B. Tech. degree.'
    >
      {children}
    </DefaultLayout>
  );
}
