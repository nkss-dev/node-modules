export default function formatDate(date: Date): string {
  const day = date.getDate();
  const suffix = getDaySuffix(day);
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
    date
  );
  const year = date.getFullYear();
  return `${day}${suffix} ${month}, ${year}`;
}

function getDaySuffix(day: number): string {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}
