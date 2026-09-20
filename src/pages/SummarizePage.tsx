import {
  Badge,
  Button,
  Card,
  Divider,
  FileInput,
  Group,
  List,
  Loader,
  Select,
  Stack,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { IconFileMusic, IconSparkles } from '@tabler/icons-react';
import { useState } from 'react';
import { meetings } from '../mocks/data';
import { formatDateTime } from '../lib/format';

interface DemoResult {
  summary: string;
  decisions: string[];
  tasks: { title: string; assignee: string; due: string }[];
}

const demoResult: DemoResult = {
  summary:
    'Обсуждение шло вокруг сроков интеграции с внешним сервисом отчётности. ' +
    'Команда согласилась, что текущая схема выгрузки не выдержит нагрузки ' +
    'в конце квартала, и разделила работу на два этапа: быстрое ограничение ' +
    'объёма данных и полноценная фоновая обработка в следующем спринте.',
  decisions: [
    'Фоновую обработку отчётов делаем в следующем спринте.',
    'На время переходного периода ограничиваем выгрузку тремя месяцами.',
    'Статус интеграции выносим отдельным пунктом на ближайшую планёрку.',
  ],
  tasks: [
    {
      title: 'Описать схему фоновой обработки отчётов',
      assignee: 'Алексей Громов',
      due: '30 сентября',
    },
    {
      title: 'Собрать метрики по времени выгрузки',
      assignee: 'Дарья Климова',
      due: '25 сентября',
    },
    {
      title: 'Обновить пользовательскую документацию',
      assignee: 'Полина Ершова',
      due: '2 октября',
    },
  ],
};

export function SummarizePage() {
  const [meetingId, setMeetingId] = useState<string | null>(meetings[2].id);
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');

  const run = () => {
    setState('loading');
    setTimeout(() => setState('done'), 1600);
  };

  const canRun = meetingId !== null && (file !== null || notes.trim().length > 0);

  return (
    <Stack gap="lg" maw={820}>
      <Stack gap={4}>
        <Title order={2}>Разбор записи</Title>
        <Text c="dimmed">
          Загрузите аудиозапись или вставьте заметки — из них соберётся
          конспект, список решений и задачи с ответственными.
        </Text>
      </Stack>

      <Card padding="lg">
        <Stack>
          <Select
            label="К какому собранию относится запись"
            data={meetings.map((m) => ({
              value: m.id,
              label: `${m.title} — ${formatDateTime(m.startsAt)}`,
            }))}
            value={meetingId}
            onChange={setMeetingId}
          />
          <FileInput
            label="Аудиозапись"
            placeholder="mp3, m4a или wav"
            accept="audio/*"
            leftSection={<IconFileMusic size={16} />}
            value={file}
            onChange={setFile}
            clearable
          />
          <Textarea
            label="Или заметки с собрания"
            placeholder="Вставьте текст расшифровки или свои записи"
            minRows={5}
            autosize
            value={notes}
            onChange={(e) => setNotes(e.currentTarget.value)}
          />
          <Group>
            <Button
              onClick={run}
              disabled={!canRun || state === 'loading'}
              leftSection={
                state === 'loading' ? (
                  <Loader size={14} color="white" />
                ) : (
                  <IconSparkles size={16} />
                )
              }
            >
              {state === 'loading' ? 'Разбираем запись...' : 'Разобрать запись'}
            </Button>
            {state === 'done' && (
              <Button variant="subtle" onClick={() => setState('idle')}>
                Очистить
              </Button>
            )}
          </Group>
          <Text size="xs" c="dimmed">
            Демонстрационный режим: результат подготовлен заранее.
            Настоящая обработка появится после подключения backend.
          </Text>
        </Stack>
      </Card>

      {state === 'done' && (
        <Card padding="lg">
          <Stack gap="md">
            <Group justify="space-between">
              <Title order={4}>Результат разбора</Title>
              <Badge
                variant="light"
                color="cyan"
                leftSection={<IconSparkles size={10} />}
              >
                Черновик — проверьте перед сохранением
              </Badge>
            </Group>

            <Text>{demoResult.summary}</Text>

            <Divider label="Решения" labelPosition="left" />
            <List spacing="xs" size="sm">
              {demoResult.decisions.map((decision) => (
                <List.Item key={decision}>{decision}</List.Item>
              ))}
            </List>

            <Divider label="Задачи" labelPosition="left" />
            <Stack gap="xs">
              {demoResult.tasks.map((task) => (
                <Group key={task.title} justify="space-between" wrap="nowrap">
                  <Text size="sm">{task.title}</Text>
                  <Text size="xs" c="dimmed" style={{ flexShrink: 0 }}>
                    {task.assignee} · до {task.due}
                  </Text>
                </Group>
              ))}
            </Stack>

            <Group mt="sm">
              <Button>Сохранить в протокол</Button>
              <Button variant="default">Разобрать заново</Button>
            </Group>
          </Stack>
        </Card>
      )}
    </Stack>
  );
}