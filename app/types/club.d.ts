type Club = {
  name: string;
  alias: NullString;
  category: ClubCategory;
  description: string;
  branch: Array<Branch>;
  is_official: boolean;
  faculties: Array<ClubFaculty>;
  admins: Array<ClubAdmin>;
  socials: Array<ClubSocial>;
};

type ClubAdmin = {
  position: string;
  name: string;
  phone: string;
  email: string;
};

type ClubCategory =
  | 'Cultural Club'
  | 'Magazine'
  | 'Technical Club'
  | 'Technical Society';

type ClubFaculty = {
  name: string;
  phone: string;
};

type ClubSocial = {
  platform: string;
  link: string;
};
