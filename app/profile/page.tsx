import DefaultLayout from "../../components/default-layout";

export const metadata = {
  title: 'Profile',
  description:
    'Your profile',
};

export default function ProfilePage() {
  return (
    <DefaultLayout
      title="Profile"
      description="This page will display your details, perks on our platform, and some other management tools made just for you!"
      prompt="This page is back-logged for our next major version. Hang tight!"
      alert={true}
    >
      <></>
    </DefaultLayout>
  );
}
