import { fetcher } from '../../utils/fetcher';
import formatDate from '../../utils/format-date';

export const metadata = {
  title: 'Announcements',
  description:
    'A dashboard for all event notifications and academic announcements',
};

const groupAnnouncementsByDate = (announcements: AcademicAnnouncement[]) => {
  const groupedAnnouncements = new Map<string, AcademicAnnouncement[]>();

  for (const announcement of announcements) {
    const date = new Date(announcement.date_of_creation);
    const dateKey = formatDate(date);
    const announcementsForDate = groupedAnnouncements.get(dateKey) ?? [];
    announcementsForDate.push(announcement);
    groupedAnnouncements.set(dateKey, announcementsForDate);
  }

  return groupedAnnouncements;
};

export default async function AnnouncementsPage() {
  const announcements: Array<AcademicAnnouncement> = await fetcher(
    'https://api.nksss.live/announcements'
  );
  const groupedAnnouncements = groupAnnouncementsByDate(announcements);

  return (
    <ul>
      {Array.from(groupedAnnouncements).map(
        ([dateKey, announcementForDate], index) => (
          <li className="mb-6" key={index}>
            <h4>
              {dateKey.slice(0, 2)}
              <sup>{dateKey.slice(2, 4)}</sup>
              {dateKey.slice(4)}
            </h4>

            <ul className="text-palette-300 ml-4 sm:ml-6 md:ml-8">
              {announcementForDate.map((announcement, innerIndex) => (
                <li className="list-disc mt-2" key={`${index}-${innerIndex}`}>
                  {announcement.subtitle ? (
                    <ul>
                      <li>
                        <a
                          className="hover:text-palette-100"
                          href={announcement.title_link}
                          target="_blank"
                        >
                          {announcement.title}
                        </a>
                      </li>
                      <li>
                        <a
                          className="hover:text-palette-100"
                          href={announcement.subtitle_link}
                          target="_blank"
                        >
                          {announcement.subtitle}
                        </a>
                      </li>
                    </ul>
                  ) : (
                    <a
                      className="hover:text-palette-100"
                      href={announcement.title_link}
                      target="_blank"
                    >
                      {announcement.title}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </li>
        )
      )}
    </ul>
  );
}
