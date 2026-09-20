import {
  Anchor,
  Box,
  Button,
  Card,
  Center,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('timur@example.com');
  const [password, setPassword] = useState('demo1234');

  return (
    <Center mih="100vh" p="md">
      <Box w="100%" maw={400}>
        <Stack gap="lg">
          <Stack gap={4}>
            <Title order={2}>Протокол</Title>
            <Text c="dimmed">
              Повестка, решения и задачи каждого собрания — в одном месте.
            </Text>
          </Stack>

          <Card padding="lg">
            <Stack>
              <TextInput
                label="Рабочая почта"
                placeholder="name@company.ru"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <PasswordInput
                label="Пароль"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <Button fullWidth onClick={() => navigate('/')}>
                Войти
              </Button>
              <Text size="xs" c="dimmed" ta="center">
                Демо-версия: поля заполнены заранее, вход открывает
                интерфейс с тестовыми данными.
              </Text>
            </Stack>
          </Card>

          <Text size="sm" ta="center">
            Нет аккаунта?{' '}
            <Anchor href="#">Запросите доступ у администратора</Anchor>
          </Text>
        </Stack>
      </Box>
    </Center>
  );
}