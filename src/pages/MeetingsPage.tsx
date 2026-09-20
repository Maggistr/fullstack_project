import {
  Button,
  Grid,
  Group,
  SegmentedControl,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { meetings } from '../mocks/data';
import { MeetingCard } from '../components/MeetingCard';
import { EmptyState } from '../components/EmptyState';
import type { MeetingStatus } from '../types';

type Filter = 'all' | MeetingStatus;

export function MeetingsPage() {
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  const visible = useMemo(
    () =>
      meetings
        .filter((m) => (filter === 'all' ? true : m.status === filter))
        .filter((m) =>
          m.title.toLowerCase().includes(query.trim().toLowerCase())
        )
        .sort((a, b) => b.startsAt.localeCompare(a.startsAt)),
    [filter, query]
  );

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="flex-end">
        <Title order={2}>Собрания</Title>
        <Button component={Link} to="/meetings/new">
          Запланировать собрание
        </Button>
      </Group>

      <Group>
        <TextInput
          placeholder="Поиск по названию"
          leftSection={<IconSearch size={16} />}
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          w={{ base: '100%', sm: 280 }}
        />
        <SegmentedControl
          value={filter}
          onChange={(value) => setFilter(value as Filter)}
          data={[
            { value: 'all',         label: 'Все'           },
            { value: 'planned',     label: 'Запланированы' },
            { value: 'in_progress', label: 'Идут'          },
            { value: 'done',        label: 'Завершены'     },
          ]}
        />
      </Group>

      {visible.length === 0 ? (
        <EmptyState
          title="Ничего не нашлось"
          description="Измените фильтр или поисковый запрос — либо запланируйте новое собрание."
          actionLabel="Запланировать собрание"
          actionTo="/meetings/new"
        />
      ) : (
        <Grid>
          {visible.map((meeting) => (
            <Grid.Col key={meeting.id} span={{ base: 12, md: 6, xl: 4 }}>
              <MeetingCard meeting={meeting} />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Stack>
  );
}