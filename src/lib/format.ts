import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('ru');
dayjs.extend(relativeTime);

export const formatDateTime = (iso: string) =>
  dayjs(iso).format('D MMMM, HH:mm');

export const formatDate = (iso: string) =>
  dayjs(iso).format('D MMMM YYYY');

export const formatShortDate = (iso: string) =>
  dayjs(iso).format('D MMM');

export const formatTimeRange = (iso: string, minutes: number) =>
  `${dayjs(iso).format('HH:mm')} – ${dayjs(iso).add(minutes, 'minute').format('HH:mm')}`;

export const daysLeft = (isoDate: string) =>
  dayjs(isoDate).startOf('day').diff(dayjs().startOf('day'), 'day');

export const deadlineLabel = (isoDate: string) => {
  const d = daysLeft(isoDate);
  if (d < 0) return `просрочено на ${Math.abs(d)} дн.`;
  if (d === 0) return 'сегодня';
  if (d === 1) return 'завтра';
  return `через ${d} дн.`;
};

export const totalAgendaMinutes = (items: { minutes: number }[]) =>
  items.reduce((sum, item) => sum + item.minutes, 0);

export const initials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('');