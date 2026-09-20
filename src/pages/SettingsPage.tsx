import {
  Button,
  Card,
  Divider,
  Group,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import { currentUser } from '../mocks/data';

export function SettingsPage() {
  const [name, setName] = useState(currentUser.name);
  const [role, setRole] = useState(currentUser.role);
  const [digest, setDigest] = useState(true);
  const [deadlineAlerts, setDeadlineAlerts] = useState(true);
  const [autoSummary, setAutoSummary] = useState(false);

  return (
    <Stack gap="lg" maw={640}>
      <Stack gap={4}>
        <Title order={2}>Настройки</Title>
        <Text c="dimmed">
          Профиль и уведомления. Сохранение заработает вместе с backend.
        </Text>
      </Stack>

      <Card padding="lg">
        <Stack>
          <Title order={4}>Профиль</Title>
          <TextInput
            label="Имя"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <TextInput
            label="Должность"
            value={role}
            onChange={(e) => setRole(e.currentTarget.value)}
          />
          <Select
            label="Часовой пояс"
            data={[
              'Europe/Moscow',
              'Europe/Amsterdam',
              'Asia/Novosibirsk',
            ]}
            defaultValue="Europe/Moscow"
          />
        </Stack>
      </Card>

      <Card padding="lg">
        <Stack>
          <Title order={4}>Уведомления</Title>
          <Switch
            checked={digest}
            onChange={(e) => setDigest(e.currentTarget.checked)}
            label="Присылать сводку предстоящих собраний по утрам"
          />
          <Divider />
          <Switch
            checked={deadlineAlerts}
            onChange={(e) => setDeadlineAlerts(e.currentTarget.checked)}
            label="Напоминать за день до дедлайна задачи"
          />
          <Divider />
          <Switch
            checked={autoSummary}
            onChange={(e) => setAutoSummary(e.currentTarget.checked)}
            label="Разбирать загруженные аудиозаписи автоматически"
          />
        </Stack>
      </Card>

      <Group>
        <Button>Сохранить изменения</Button>
      </Group>
    </Stack>
  );
}