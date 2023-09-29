import DefaultLayout from '@/components/default-layout';

export const metadata = {
  title: 'About',
  description:
    'A page to tell tales about the project and express hearty thanks to all the people who helped make this project see the light of day',
};

export default function AboutPage() {
  return (
    <DefaultLayout
      title="About"
      description="A page to tell tales about the project and express hearty thanks to all the people who helped make this project see the light of day"
      prompt="This page is under construction with sprinkles of love and affection. Hang tight!"
    >
      <></>
    </DefaultLayout>
  );
}
