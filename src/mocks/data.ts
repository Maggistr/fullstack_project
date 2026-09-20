import type { Meeting, Participant, Task } from '../types';

export const participants: Participant[] = [
  { id: 'u1', name: 'Тимур Язалиев', role: 'Руководитель проекта' },
  { id: 'u2', name: 'Алексей Громов', role: 'Backend-разработчик' },
  { id: 'u3', name: 'Дарья Климова', role: 'Аналитик' },
  { id: 'u4', name: 'Иван Соболев', role: 'Frontend-разработчик' },
  { id: 'u5', name: 'Полина Ершова', role: 'Дизайнер' },
];

export const meetings: Meeting[] = [
  {
    id: 'm1',
    title: 'Планёрка команды',
    startsAt: '2026-09-22T10:00:00',
    durationMinutes: 45,
    place: 'Переговорная №1',
    status: 'planned',
    participantIds: ['u1', 'u2', 'u4'],
    agenda: [
      { id: 'a1', title: 'Итоги прошлой недели', minutes: 10, speakerId: 'u1' },
      { id: 'a2', title: 'Блокеры по задачам', minutes: 20, speakerId: 'u2' },
      { id: 'a3', title: 'План на неделю', minutes: 15, speakerId: 'u1' },
    ],
    decisions: [],
    summary: null,
    transcript: null,
    hasAudio: false,
  },
  {
    id: 'm2',
    title: 'Ревью дизайна личного кабинета',
    startsAt: '2026-09-20T14:30:00',
    durationMinutes: 60,
    place: 'Zoom',
    status: 'in_progress',
    participantIds: ['u1', 'u4', 'u5'],
    agenda: [
      { id: 'a4', title: 'Макеты главной страницы', minutes: 25, speakerId: 'u5' },
      { id: 'a5', title: 'Пустые состояния экранов', minutes: 20, speakerId: 'u5' },
      { id: 'a6', title: 'Что берём в спринт', minutes: 15, speakerId: 'u1' },
    ],
    decisions: [
      {
        id: 'd1',
        text: 'Главную страницу собираем из трёх блоков: ближайшее собрание, задачи, решения.',
        agendaItemId: 'a4',
        suggestedByAi: false,
      },
    ],
    summary: null,
    transcript: null,
    hasAudio: true,
  },
  {
    id: 'm3',
    title: 'Разбор инцидента с выгрузкой отчётов',
    startsAt: '2026-09-15T11:00:00',
    durationMinutes: 50,
    place: 'Переговорная №2',
    status: 'done',
    participantIds: ['u1', 'u2', 'u3'],
    agenda: [
      { id: 'a7', title: 'Хронология инцидента', minutes: 15, speakerId: 'u2' },
      { id: 'a8', title: 'Причины и что чинить', minutes: 25, speakerId: 'u2' },
      { id: 'a9', title: 'Как не повторить', minutes: 10, speakerId: 'u1' },
    ],
    decisions: [
      {
        id: 'd2',
        text: 'Добавить алерт на время выгрузки дольше 30 секунд.',
        agendaItemId: 'a8',
        suggestedByAi: false,
      },
      {
        id: 'd3',
        text: 'Ограничить период выгрузки тремя месяцами до появления фоновой обработки.',
        agendaItemId: 'a8',
        suggestedByAi: true,
      },
    ],
    summary:
      'Выгрузка отчётов падала на запросах за период больше года. ' +
      'Договорились закрыть проблему двумя шагами: ограничить период и добавить алерт. ' +
      'Фоновую обработку вынесли в следующий спринт.',
    transcript:
      'Алексей: первые жалобы пришли в четверг, в логах таймаут на 60 секундах.\n' +
      'Тимур: сколько пользователей задело?\n' +
      'Алексей: восемь компаний, все с большими периодами.\n' +
      'Дарья: все обращения про отчёты за год и больше.\n' +
      'Тимур: ограничиваем тремя месяцами и вешаем алерт.',
    hasAudio: true,
  },
  {
    id: 'm4',
    title: 'Приоритеты бэклога на октябрь',
    startsAt: '2026-09-25T16:00:00',
    durationMinutes: 90,
    place: 'Переговорная №1',
    status: 'planned',
    participantIds: ['u1', 'u2', 'u3', 'u4', 'u5'],
    agenda: [
      { id: 'a10', title: 'Что не успели в сентябре', minutes: 20, speakerId: 'u1' },
      { id: 'a11', title: 'Запросы от поддержки', minutes: 30, speakerId: 'u3' },
      { id: 'a12', title: 'Голосование по приоритетам', minutes: 40, speakerId: 'u1' },
    ],
    decisions: [],
    summary: null,
    transcript: null,
    hasAudio: false,
  },
];

export const tasks: Task[] = [
  {
    id: 't1',
    title: 'Добавить алерт на длительность выгрузки',
    meetingId: 'm3',
    assigneeId: 'u2',
    dueDate: '2026-09-23',
    status: 'in_progress',
    priority: 'high',
  },
  {
    id: 't2',
    title: 'Ограничить период выгрузки тремя месяцами',
    meetingId: 'm3',
    assigneeId: 'u2',
    dueDate: '2026-09-18',
    status: 'done',
    priority: 'high',
  },
  {
    id: 't3',
    title: 'Собрать требования к фоновой обработке',
    meetingId: 'm3',
    assigneeId: 'u3',
    dueDate: '2026-09-30',
    status: 'todo',
    priority: 'normal',
  },
  {
    id: 't4',
    title: 'Отрисовать пустые состояния экранов',
    meetingId: 'm2',
    assigneeId: 'u5',
    dueDate: '2026-09-26',
    status: 'todo',
    priority: 'normal',
  },
  {
    id: 't5',
    title: 'Свёрстать карточку собрания',
    meetingId: 'm2',
    assigneeId: 'u4',
    dueDate: '2026-09-24',
    status: 'in_progress',
    priority: 'normal',
  },
  {
    id: 't6',
    title: 'Подготовить выписку из бэклога',
    meetingId: 'm4',
    assigneeId: 'u3',
    dueDate: '2026-10-03',
    status: 'todo',
    priority: 'low',
  },
];

export const currentUser = participants[0];

export const getParticipant = (id: string) =>
  participants.find((p) => p.id === id);

export const getParticipantName = (id: string) =>
  getParticipant(id)?.name ?? 'Неизвестный';

export const getMeeting = (id: string) =>
  meetings.find((m) => m.id === id);

export const getMeetingTitle = (id: string) =>
  getMeeting(id)?.title ?? 'Собрание удалено';

export const getTasksByMeeting = (meetingId: string) =>
  tasks.filter((t) => t.meetingId === meetingId);