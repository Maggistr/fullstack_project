import {
  ActionIcon,
  Alert,
  Button,
  Card,
  Grid,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { participants } from '../mocks/data';
import { totalAgendaMinutes } from '../lib/format';

interface DraftAgendaItem {
  key: string;
  title: string;
  minutes: number;
  speakerId: string;
}

export function MeetingCreatePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [startsAt, setStartsAt] = useState<string | null>(null);
  const [place, setPlace] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [agenda, setAgenda] = useState<DraftAgendaItem[]>([
    { key: 'draft-1', title: '', minutes: 15, speakerId: participants[0].id },
  ]);
  const [saved, setSaved] = useState(false);

  const updateItem = (key: string, patch: Partial<DraftAgendaItem>) =>
    setAgenda((items) =>
      items.map((item) => (item.key === key ? { ...item, ...patch } : item))
    );

  const addItem = () =>
    setAgenda((items) => [
      ...items,
      {
        key: `draft-${Date.now()}`,
        title: '',
        minutes: 15,
        speakerId: participants[0].id,
      },
    ]);

  const removeItem = (key: string) =>
    setAgenda((items) => items.filter((item) => item.key !== key));

  const canSave =
    title.trim().length > 0 && startsAt !== null && selected.length > 0;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => navigate('/meetings'), 1200);
  };

  return (
    <Stack gap="lg" maw={860}>
      <Stack gap={4}>
        <Title order={2}>Новое собрание</Title>
        <Text c="dimmed">
          Заполните повестку заранее — по ней потом соберётся протокол.
        </Text>
      </Stack>

      {saved && (
        <Alert color="teal" variant="light" title="Собрание запланировано">
          Черновик принят. Постоянное хранение появится после подключения
          backend.
        </Alert>
      )}

      <Card padding="lg">
        <Stack>
          <TextInput
            label="Название"
            placeholder="Например: планёрка команды"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            required
          />
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <DateTimePicker
                label="Начало"
                placeholder="Выберите дату и время"
                value={startsAt}
                onChange={setStartsAt}
                required
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Место или ссылка"
                placeholder="Переговорная №1 или ссылка на созвон"
                value={place}
                onChange={(e) => setPlace(e.currentTarget.value)}
              />
            </Grid.Col>
          </Grid>
          <MultiSelect
            label="Участники"
            placeholder="Выберите коллег"
            data={participants.map((p) => ({
              value: p.id,
              label: `${p.name} — ${p.role}`,
            }))}
            value={selected}
            onChange={setSelected}
            searchable
            required
          />
        </Stack>
      </Card>

      <Card padding="lg">
        <Stack>
          <Group justify="space-between">
            <Title order={4}>Повестка</Title>
            <Text size="sm" c="dimmed">
              Всего {totalAgendaMinutes(agenda)} мин
            </Text>
          </Group>

          {agenda.map((item, index) => (
            <Grid key={item.key} align="flex-end">
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <TextInput
                  label={index === 0 ? 'Пункт обсуждения' : undefined}
                  placeholder={`Пункт ${index + 1}`}
                  value={item.title}
                  onChange={(e) =>
                    updateItem(item.key, { title: e.currentTarget.value })
                  }
                />
              </Grid.Col>
              <Grid.Col span={{ base: 6, sm: 3 }}>
                <Select
                  label={index === 0 ? 'Докладчик' : undefined}
                  data={participants.map((p) => ({
                    value: p.id,
                    label: p.name,
                  }))}
                  value={item.speakerId}
                  onChange={(value) =>
                    updateItem(item.key, {
                      speakerId: value ?? participants[0].id,
                    })
                  }
                />
              </Grid.Col>
              <Grid.Col span={{ base: 4, sm: 2 }}>
                <NumberInput
                  label={index === 0 ? 'Минут' : undefined}
                  min={5}
                  max={180}
                  step={5}
                  value={item.minutes}
                  onChange={(value) =>
                    updateItem(item.key, { minutes: Number(value) || 5 })
                  }
                />
              </Grid.Col>
              <Grid.Col span={{ base: 2, sm: 1 }}>
                <ActionIcon
                  variant="subtle"
                  color="red"
                  size="lg"
                  aria-label="Удалить пункт"
                  disabled={agenda.length === 1}
                  onClick={() => removeItem(item.key)}
                >
                  <IconTrash size={18} />
                </ActionIcon>
              </Grid.Col>
            </Grid>
          ))}

          <Group>
            <Button
              variant="light"
              leftSection={<IconPlus size={16} />}
              onClick={addItem}
            >
              Добавить пункт
            </Button>
          </Group>
        </Stack>
      </Card>

      <Group>
        <Button onClick={handleSave} disabled={!canSave}>
          Запланировать собрание
        </Button>
        <Button variant="subtle" onClick={() => navigate(-1)}>
          Отменить
        </Button>
      </Group>
    </Stack>
  );
}