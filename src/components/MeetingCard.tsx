import { Avatar, Card, Group, Stack, Text, Title, Tooltip } from '@mantine/core';
import { IconClock, IconMapPin } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { getParticipantName } from '../mocks/data';
import type { Meeting } from '../types';
import { formatDateTime, formatTimeRange, initials } from '../lib/format';
import { MeetingStatusBadge } from './StatusBadge';

export function MeetingCard({ meeting }: { meeting: Meeting }) {
  return (
    <Card component={Link} to={`/meetings/${meeting.id}`} padding="lg">
      <Stack gap="sm">
        <Group justify="space-between" align="flex-start" wrap="nowrap">
          <Title order={4} lh={1.25}>
            {meeting.title}
          </Title>
          <MeetingStatusBadge status={meeting.status} />
        </Group>

        <Group gap="lg">
          <Group gap={6}>
            <IconClock size={16} stroke={1.6} />
            <Text size="sm" c="dimmed">
              {formatDateTime(meeting.startsAt)} ·{' '}
              {formatTimeRange(meeting.startsAt, meeting.durationMinutes)}
            </Text>
          </Group>
          <Group gap={6}>
            <IconMapPin size={16} stroke={1.6} />
            <Text size="sm" c="dimmed">
              {meeting.place}
            </Text>
          </Group>
        </Group>

        <Group justify="space-between">
          <Avatar.Group spacing="sm">
            {meeting.participantIds.slice(0, 4).map((id) => (
              <Tooltip key={id} label={getParticipantName(id)} withArrow>
                <Avatar size="sm" color="indigo" radius="xl">
                  {initials(getParticipantName(id))}
                </Avatar>
              </Tooltip>
            ))}
            {meeting.participantIds.length > 4 && (
              <Avatar size="sm" radius="xl">
                +{meeting.participantIds.length - 4}
              </Avatar>
            )}
          </Avatar.Group>
          <Text size="sm" c="dimmed">
            {meeting.agenda.length} пунктов · {meeting.decisions.length} решений
          </Text>
        </Group>
      </Stack>
    </Card>
  );
}