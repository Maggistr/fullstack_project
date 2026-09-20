import {
  Badge,
  Card,
  Checkbox,
  Group,
  SegmentedControl,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { tasks as initialTasks, getParticipantName, getMeetingTitle } from '../mocks/data';
import { TaskPriorityBadge } from '../components/StatusBadge';
import { EmptyState } from '../components/EmptyState';
import { daysLeft, deadlineLabel, formatShortDate } from '../lib/format';
import type { Task, TaskStatus } from '../types';

type Filter = 'all' | TaskStatus | 'overdue';

export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<Filter>('all');

  const toggle = (id: string) =>
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, status: task.status === 'done' ? 'todo' : 'done' }
          : task
      )
    );

  const visible = useMemo(
    () =>
      tasks
        .filter((task) => {
          if (filter === 'all') return true;
          if (filter === 'overdue')
            return task.status !== 'done' && daysLeft(task.dueDate) < 0;
          return task.status === filter;
        })
        .sort((a, b) => a.dueDate.localeCompare(b.dueDate)),
    [tasks, filter]
  );

  return (
    <Stack gap="lg">
      <Stack gap={4}>
        <Title order={2}>Задачи</Title>
        <Text c="dimmed">
          Поручения из собраний со сроками и ответственными.
        </Text>
      </Stack>

      <SegmentedControl
        value={filter}
        onChange={(value) => setFilter(value as Filter)}
        data={[
          { value: 'all',         label: 'Все'           },
          { value: 'todo',        label: 'К выполнению'  },
          { value: 'in_progress', label: 'В работе'      },
          { value: 'done',        label: 'Выполненные'   },
          { value: 'overdue',     label: 'Просроченные'  },
        ]}
      />

      {visible.length === 0 ? (
        <EmptyState
          title="Задач в этом разрезе нет"
          description="Выберите другой фильтр или откройте собрание."
          actionLabel="К собраниям"
          actionTo="/meetings"
        />
      ) : (
        <Stack gap="sm">
          {visible.map((task) => {
            const left = daysLeft(task.dueDate);
            const overdue = task.status !== 'done' && left < 0;
            return (
              <Card key={task.id} padding="md">
                <Group justify="space-between" align="flex-start" wrap="nowrap">
                  <Group align="flex-start" wrap="nowrap" gap="sm">
                    <Checkbox
                      checked={task.status === 'done'}
                      onChange={() => toggle(task.id)}
                      aria-label={`Отметить задачу выполненной`}
                      mt={2}
                    />
                    <Stack gap={4}>
                      <Text td={task.status === 'done' ? 'line-through' : undefined}>
                        {task.title}
                      </Text>
                      <Group gap="xs">
                        <Text size="xs" c="dimmed">
                          {getParticipantName(task.assigneeId)}
                        </Text>
                        <Text size="xs" c="dimmed">·</Text>
                        <Text
                          size="xs"
                          c="dimmed"
                          component={Link}
                          to={`/meetings/${task.meetingId}`}
                          style={{ textDecoration: 'underline' }}
                        >
                          {getMeetingTitle(task.meetingId)}
                        </Text>
                      </Group>
                    </Stack>
                  </Group>
                  <Stack gap={6} align="flex-end" style={{ flexShrink: 0 }}>
                    <Badge
                      variant="light"
                      color={
                        task.status === 'done'
                          ? 'teal'
                          : overdue
                          ? 'red'
                          : left <= 2
                          ? 'orange'
                          : 'gray'
                      }
                    >
                      {formatShortDate(task.dueDate)}
                      {task.status === 'done'
                        ? ''
                        : ` · ${deadlineLabel(task.dueDate)}`}
                    </Badge>
                    <TaskPriorityBadge priority={task.priority} />
                  </Stack>
                </Group>
              </Card>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}