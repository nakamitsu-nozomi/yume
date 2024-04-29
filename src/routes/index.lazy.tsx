import { createLazyFileRoute } from '@tanstack/react-router';
import { PrefecturePage } from '../features/prefecture/pages/PrefecturePage.tsx';

export const Route = createLazyFileRoute('/')({
  component: PrefecturePage,
});
