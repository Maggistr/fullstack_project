import {
  AppShell,
  Avatar,
  Burger,
  Group,
  Menu,
  NavLink,
  ScrollArea,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconCalendarEvent,
  IconChecklist,
  IconLayoutDashboard,
  IconLogout,
  IconSettings,
  IconSparkles,
} from '@tabler/icons-react';
import {
  NavLink as RouterNavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { currentUser } from '../mocks/data';
import { initials } from '../lib/format';

const navItems = [
  { to: '/',          label: 'Обзор',         icon: IconLayoutDashboard },
  { to: '/meetings',  label: 'Собрания',       icon: IconCalendarEvent   },
  { to: '/tasks',     label: 'Задачи',         icon: IconChecklist       },
  { to: '/summarize', label: 'Разбор записи',  icon: IconSparkles        },
  { to: '/settings',  label: 'Настройки',      icon: IconSettings        },
];

export function AppLayout() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 248, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="lg"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group gap="sm">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              aria-label="Меню"
            />
            <Text fw={700} size="lg">
              Протокол
            </Text>
          </Group>

          <Menu position="bottom-end" withArrow>
            <Menu.Target>
              <UnstyledButton>
                <Group gap="xs">
                  <Avatar color="indigo" radius="xl" size="sm">
                    {initials(currentUser.name)}
                  </Avatar>
                  <Text size="sm" visibleFrom="xs">
                    {currentUser.name}
                  </Text>
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>{currentUser.role}</Menu.Label>
              <Menu.Item
                leftSection={<IconSettings size={16} />}
                onClick={() => navigate('/settings')}
              >
                Настройки
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={<IconLogout size={16} />}
                onClick={() => navigate('/login')}
              >
                Выйти
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="sm">
        <ScrollArea>
          <Stack gap={4}>
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                component={RouterNavLink}
                to={to}
                label={label}
                leftSection={<Icon size={18} stroke={1.6} />}
                active={isActive(to)}
                onClick={close}
              />
            ))}
          </Stack>
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}