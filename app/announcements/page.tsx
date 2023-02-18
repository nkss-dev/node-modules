import { fetcher } from '../../utils/fetcher';

export default async function AnnouncementsPage() {
  const announcements: Array<AcademicAnnouncement> = await fetcher(
    'https://api.nksss.live/announcements'
  );

  return (
    <table>
      <tbody>
      {announcements.map((announcement: AcademicAnnouncement, index) => {
        const date = new Date(announcement.date_of_creation);
        return (
          <tr key={index}>
            <td className='font-roboto-mono'>{date.toLocaleDateString()}</td>
            <td className='text-start'>
              {announcement.subtitle ? (
                <ul>
                  <li>
                    <a className="hyperlink" href={announcement.title_link} target="_blank">
                      {announcement.title}
                    </a>
                  </li>
                  <li>
                    <a className="hyperlink" href={announcement.subtitle_link} target="_blank">
                      {announcement.subtitle}
                    </a>
                  </li>
                </ul>
              ) : (
                <a className="hyperlink" href={announcement.title_link} target="_blank">
                  {announcement.title}
                </a>
              )}
            </td>
          </tr>
        );
      })}
      </tbody>
    </table>
  );
}
