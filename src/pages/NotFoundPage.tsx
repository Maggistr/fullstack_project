import { Center } from '@mantine/core';
import { EmptyState } from '../components/EmptyState';

export function NotFoundPage() {
  return (
    <Center mih="60vh">
      <EmptyState
        title="Страница не найдена"
        description="Такого адреса в приложении нет. Вернитесь на главную и продолжите оттуда."
        actionLabel="На главную"
        actionTo="/"
      />
    </Center>
  );
}