type Club = {
  name: string;
  alias: string;
  category: ClubCategory;
  short_description: string;
  email: string;
  is_official: boolean;
  description: ClubDescription;
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
};

type ClubCategory =
  | 'Committee'
  | 'Crew'
  | 'Cultural Club'
  | 'Magazine'
  | 'Technical Club'
  | 'Technical Society';

type ClubDescription = {
  why_us: string;
  about_us: string;
  role_of_sophomore: string;
  role_of_junior: string;
  role_of_senior: string;
};

type ClubFaculty = {
  name: string;
  phone: string;
};

type ClubMember = {
  roll_number: string;
  name: string;
  section: string;
  batch: number;
  email: string;
  position: string;
};

type ClubSocial = {
  platform: string;
  link: string;
};
