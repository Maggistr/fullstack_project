import { Button, Card, Stack, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionTo,
}: EmptyStateProps) {
  return (
    <Card padding="xl">
      <Stack align="center" gap="xs">
        <Title order={4}>{title}</Title>
        <Text c="dimmed" ta="center" maw={420}>
          {description}
        </Text>
        {actionLabel && actionTo && (
          <Button component={Link} to={actionTo} mt="sm">
            {actionLabel}
          </Button>
        )}
      </Stack>
    </Card>
  );
}