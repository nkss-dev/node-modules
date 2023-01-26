const branches = ['CE', 'CS', 'EC', 'EE', 'IT', 'ME', 'PI'] as const;
type Branch = typeof branches[number];

const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'] as const;
type Semester = typeof semesters[number];

type Specifics = {
  branch: Branch;
  semester: Semester;
  credits: Array<number>;
};

type Course = {
  code: string;
  title: string;
  prereq: Array<string>;
  kind: string;
  objectives: Array<string>;
  content: Array<string>;
  book_names: Array<string>;
  outcomes: Array<string>;

  specifics: Array<Specifics>;
};
