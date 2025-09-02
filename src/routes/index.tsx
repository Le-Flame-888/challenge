import { createFileRoute } from '@tanstack/react-router'
import { ListUsersFeature } from '@/core/users/features/list.feature';

export const Route = createFileRoute('/')({
  component: ListUsersFeature,
})

