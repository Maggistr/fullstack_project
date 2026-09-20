import { Badge } from '@mantine/core';
import type { MeetingStatus, TaskPriority, TaskStatus } from '../types';

const meetingLabels: Record<MeetingStatus, { label: string; color: string }> = {
  planned:     { label: 'Запланировано', color: 'indigo' },
  in_progress: { label: 'Идёт сейчас',  color: 'cyan'   },
  done:        { label: 'Протокол готов', color: 'teal'  },
};

const taskLabels: Record<TaskStatus, { label: string; color: string }> = {
  todo:        { label: 'К выполнению', color: 'gray'   },
  in_progress: { label: 'В работе',     color: 'indigo' },
  done:        { label: 'Выполнена',    color: 'teal'   },
};

const priorityLabels: Record<TaskPriority, { label: string; color: string }> = {
  low:    { label: 'Низкий',   color: 'gray' },
  normal: { label: 'Обычный',  color: 'cyan' },
  high:   { label: 'Высокий',  color: 'red'  },
};

export function MeetingStatusBadge({ status }: { status: MeetingStatus }) {
  const { label, color } = meetingLabels[status];
  return <Badge color={color} variant="light">{label}</Badge>;
}

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const { label, color } = taskLabels[status];
  return <Badge color={color} variant="light">{label}</Badge>;
}

export function TaskPriorityBadge({ priority }: { priority: TaskPriority }) {
  const { label, color } = priorityLabels[priority];
  return <Badge color={color} variant="dot">{label}</Badge>;
}