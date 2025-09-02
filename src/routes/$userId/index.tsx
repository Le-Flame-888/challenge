import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$userId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { userId } = Route.useParams();
  return <div>User Details for ID: {userId}</div>;
}
