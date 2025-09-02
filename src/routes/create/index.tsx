import { createFileRoute } from '@tanstack/react-router'

import { CreateUserFeature } from '@/core/users/features/create.feature';

export const Route = createFileRoute('/create/')({
  component: CreateUserFeature,
});
