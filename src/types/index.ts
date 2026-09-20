export type MeetingStatus = 'planned' | 'in_progress' | 'done';
export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'normal' | 'high';

export interface Participant {
  id: string;
  name: string;
  role: string;
}

export interface AgendaItem {
  id: string;
  title: string;
  minutes: number;
  speakerId: string;
}

export interface Decision {
  id: string;
  text: string;
  agendaItemId: string;
  suggestedByAi: boolean;
}

export interface Task {
  id: string;
  title: string;
  meetingId: string;
  assigneeId: string;
  dueDate: string;
  status: TaskStatus;
  priority: TaskPriority;
}

export interface Meeting {
  id: string;
  title: string;
  startsAt: string;
  durationMinutes: number;
  place: string;
  status: MeetingStatus;
  participantIds: string[];
  agenda: AgendaItem[];
  decisions: Decision[];
  summary: string | null;
  transcript: string | null;
  hasAudio: boolean;
}