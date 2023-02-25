type AnnouncementTypes = 'academic' | 'exam' | 'result';

type AcademicAnnouncement = {
  date_of_creation: Date;
  title: string;
  title_link: string;
  kind: AnnouncementTypes;
  subtitle?: string;
  subtitle_link?: string;
};
