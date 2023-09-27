type Student = {
  roll_number: string;
  name: string;
  section: string;
  batch: number;
  email: string;
  mobile: { String: string; Valid: boolean };
  clubs: Array<StudentClubs>;
};

type StudentClubs = {
  name: string;
  alias: string | undefined;
  position: string;
  extra_groups: Array<string>;
};
