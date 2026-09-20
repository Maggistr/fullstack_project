import {
  Alert,
  Anchor,
  Badge,
  Button,
  Card,
  Divider,
  Group,
  List,
  Stack,
  Table,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { IconArrowLeft, IconSparkles } from '@tabler/icons-react';
import { Link, useParams } from 'react-router-dom';
import { getMeeting, getParticipantName, getTasksByMeeting } from '../mocks/data';
import { MeetingStatusBadge, TaskStatusBadge } from '../components/StatusBadge';
import { EmptyState } from '../components/EmptyState';
import {
  deadlineLabel,
  formatDateTime,
  formatTimeRange,
  totalAgendaMinutes,
} from '../lib/format';

export function MeetingDetailPage() {
  const { id = '' } = useParams();
  const meeting = getMeeting(id);

  if (!meeting) {
    return (
      <EmptyState
        title="Собрание не найдено"
        description="Возможно, оно было удалено или ссылка устарела."
        actionLabel="К списку собраний"
        actionTo="/meetings"
      />
    );
  }

  const meetingTasks = getTasksByMeeting(meeting.id);

  return (
    <Stack gap="lg">
      <Anchor component={Link} to="/meetings" size="sm">
        <Group gap={4}>
          <IconArrowLeft size={14} />
          Все собрания
        </Group>
      </Anchor>

      <Group justify="space-between" align="flex-start">
        <Stack gap={4}>
          <Title order={2}>{meeting.title}</Title>
          <Text c="dimmed">
            {formatDateTime(meeting.startsAt)} ·{' '}
            {formatTimeRange(meeting.startsAt, meeting.durationMinutes)} ·{' '}
            {meeting.place}
          </Text>
        </Stack>
        <MeetingStatusBadge status={meeting.status} />
      </Group>

      <Group gap="xs">
        {meeting.participantIds.map((pid) => (
          <Badge key={pid} variant="outline" color="gray">
            {getParticipantName(pid)}
          </Badge>
        ))}
      </Group>

      <Tabs defaultValue="agenda">
        <Tabs.List>
          <Tabs.Tab value="agenda">Повестка</Tabs.Tab>
          <Tabs.Tab value="decisions">Решения</Tabs.Tab>
          <Tabs.Tab value="tasks">Задачи</Tabs.Tab>
          <Tabs.Tab value="record">Запись и конспект</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="agenda" pt="md">
          <Card padding="lg">
            <Stack gap="md">
              <Group justify="space-between">
                <Title order={4}>Пункты обсуждения</Title>
                <Text size="sm" c="dimmed">
                  {totalAgendaMinutes(meeting.agenda)} мин из{' '}
                  {meeting.durationMinutes} запланированных
                </Text>
              </Group>
              <Divider />
              <Stack gap="sm">
                {meeting.agenda.map((item, index) => (
                  <Group key={item.id} justify="space-between" wrap="nowrap">
                    <Group gap="sm" wrap="nowrap">
                      <Text c="dimmed" size="sm" w={20}>
                        {index + 1}
                      </Text>
                      <Stack gap={0}>
                        <Text>{item.title}</Text>
                        <Text size="xs" c="dimmed">
                          Докладывает {getParticipantName(item.speakerId)}
                        </Text>
                      </Stack>
                    </Group>
                    <Text size="sm" c="dimmed">
                      {item.minutes} мин
                    </Text>
                  </Group>
                ))}
              </Stack>
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="decisions" pt="md">
          {meeting.decisions.length === 0 ? (
            <EmptyState
              title="Решений пока нет"
              description="Решения появятся здесь по ходу собрания или из разбора записи."
            />
          ) : (
            <Card padding="lg">
              <List spacing="md">
                {meeting.decisions.map((decision) => (
                  <List.Item key={decision.id}>
                    <Text>{decision.text}</Text>
                    <Group gap="xs" mt={4}>
                      <Text size="xs" c="dimmed">
                        {meeting.agenda.find(
                          (a) => a.id === decision.agendaItemId
                        )?.title ?? 'Вне повестки'}
                      </Text>
                      {decision.suggestedByAi && (
                        <Badge
                          size="xs"
                          variant="light"
                          color="cyan"
                          leftSection={<IconSparkles size={10} />}
                        >
                          Предложено ИИ
                        </Badge>
                      )}
                    </Group>
                  </List.Item>
                ))}
              </List>
            </Card>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="tasks" pt="md">
          {meetingTasks.length === 0 ? (
            <EmptyState
              title="Задач по этому собранию нет"
              description="Когда из обсуждения появится поручение, оно попадёт сюда."
              actionLabel="Открыть все задачи"
              actionTo="/tasks"
            />
          ) : (
            <Card padding="lg">
              <Table verticalSpacing="sm" highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Задача</Table.Th>
                    <Table.Th>Ответственный</Table.Th>
                    <Table.Th>Срок</Table.Th>
                    <Table.Th>Статус</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {meetingTasks.map((task) => (
                    <Table.Tr key={task.id}>
                      <Table.Td>{task.title}</Table.Td>
                      <Table.Td>
                        {getParticipantName(task.assigneeId)}
                      </Table.Td>
                      <Table.Td>{deadlineLabel(task.dueDate)}</Table.Td>
                      <Table.Td>
                        <TaskStatusBadge status={task.status} />
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Card>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="record" pt="md">
          <Stack>
            {meeting.summary ? (
              <Card padding="lg">
                <Stack gap="sm">
                  <Title order={4}>Конспект обсуждения</Title>
                  <Text>{meeting.summary}</Text>
                </Stack>
              </Card>
            ) : (
              <Alert
                color="cyan"
                variant="light"
                title="Конспекта ещё нет"
                icon={<IconSparkles size={16} />}
              >
                Загрузите аудиозапись на экране «Разбор записи» — из неё
                соберётся конспект и список решений.
                <Group mt="sm">
                  <Button
                    component={Link}
                    to="/summarize"
                    size="xs"
                    leftSection={<IconSparkles size={14} />}
                  >
                    Перейти к разбору
                  </Button>
                </Group>
              </Alert>
            )}

            {meeting.transcript && (
              <Card padding="lg">
                <Stack gap="sm">
                  <Title order={4}>Расшифровка</Title>
                  <Text
                    size="sm"
                    style={{ whiteSpace: 'pre-line' }}
                    c="dimmed"
                  >
                    {meeting.transcript}
                  </Text>
                </Stack>
              </Card>
            )}
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}