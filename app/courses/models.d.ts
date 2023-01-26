type Branch = 'CE' | 'CS' | 'EC' | 'EE' | 'IT' | 'ME' | 'PI';
type Semester = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';

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
