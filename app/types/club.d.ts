type Club = {
  name: string;
  short_name: string;
  category: ClubCategory;
  email: string;
  is_official: boolean;
  description: string;
  admins: Array<ClubAdmin>;
  branch: Array<Branch>;
  faculties: Array<ClubFaculty>;
  socials: Array<ClubSocial>;
};

type ClubBasic = {
  name: string;
  short_name: string;
  category: string;
  short_description: string;
  email: string;
  is_official: boolean;
}

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
