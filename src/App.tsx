import { Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { MeetingCreatePage } from './pages/MeetingCreatePage';
import { MeetingDetailPage } from './pages/MeetingDetailPage';
import { MeetingsPage } from './pages/MeetingsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SettingsPage } from './pages/SettingsPage';
import { SummarizePage } from './pages/SummarizePage';
import { TasksPage } from './pages/TasksPage';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/meetings" element={<MeetingsPage />} />
        <Route path="/meetings/new" element={<MeetingCreatePage />} />
        <Route path="/meetings/:id" element={<MeetingDetailPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/summarize" element={<SummarizePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}