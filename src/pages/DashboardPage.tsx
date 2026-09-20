import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  List,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import {
  currentUser,
  getMeetingTitle,
  getParticipantName,
  meetings,
  tasks,
} from '../mocks/data';
import { MeetingCard } from '../components/MeetingCard';
import { deadlineLabel, daysLeft, formatShortDate } from '../lib/format';

export function DashboardPage() {
  const upcoming = meetings
    .filter((m) => m.status !== 'done')
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  const myTasks = tasks
    .filter((t) => t.status !== 'done')
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  const recentDecisions = meetings
    .flatMap((m) => m.decisions.map((d) => ({ ...d, meetingId: m.id })))
    .slice(0, 4);

  const overdue = myTasks.filter((t) => daysLeft(t.dueDate) < 0).length;

  return (
    <Stack gap="xl">
      <Group justify="space-between" align="flex-end">
        <Stack gap={2}>
          <Title order={2}>
            Добро пожаловать, {currentUser.name.split(' ')[0]}
          </Title>
          <Text c="dimmed">
            {upcoming.length} собрания впереди, {myTasks.length} задач в
            работе{overdue > 0 ? `, ${overdue} просрочено` : ''}.
          </Text>
        </Stack>
        <Button component={Link} to="/meetings/new">
          Запланировать собрание
        </Button>
      </Group>

      <Stack gap="sm">
        <Title order={3}>Ближайшие собрания</Title>
        <Grid>
          {upcoming.map((meeting) => (
            <Grid.Col key={meeting.id} span={{ base: 12, md: 6 }}>
              <MeetingCard meeting={meeting} />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card padding="lg" h="100%">
            <Stack gap="md">
              <Group justify="space-between">
                <Title order={4}>Задачи с ближайшим сроком</Title>
                <Button
                  component={Link}
                  to="/tasks"
                  variant="subtle"
                  size="compact-sm"
                >
                  Все задачи
                </Button>
              </Group>
              <Stack gap="sm">
                {myTasks.slice(0, 4).map((task) => (
                  <Group
                    key={task.id}
                    justify="space-between"
                    wrap="nowrap"
                    align="flex-start"
                  >
                    <Stack gap={2}>
                      <Text size="sm">{task.title}</Text>
                      <Text size="xs" c="dimmed">
                        {getParticipantName(task.assigneeId)} ·{' '}
                        {getMeetingTitle(task.meetingId)}
                      </Text>
                    </Stack>
                    <Badge
                      color={
                        daysLeft(task.dueDate) < 0
                          ? 'red'
                          : daysLeft(task.dueDate) <= 2
                          ? 'orange'
                          : 'gray'
                      }
                      variant="light"
                      style={{ flexShrink: 0 }}
                    >
                      {formatShortDate(task.dueDate)} ·{' '}
                      {deadlineLabel(task.dueDate)}
                    </Badge>
                  </Group>
                ))}
              </Stack>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card padding="lg" h="100%">
            <Stack gap="md">
              <Title order={4}>Последние решения</Title>
              <List spacing="sm" size="sm">
                {recentDecisions.map((decision) => (
                  <List.Item key={decision.id}>
                    <Text size="sm">{decision.text}</Text>
                    <Text size="xs" c="dimmed">
                      {getMeetingTitle(decision.meetingId)}
                      {decision.suggestedByAi ? ' · предложено ИИ' : ''}
                    </Text>
                  </List.Item>
                ))}
              </List>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}