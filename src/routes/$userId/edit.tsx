import { createFileRoute } from '@tanstack/react-router';
import { EditUserFeature } from '../../core/users/features/edit.feature';

export const Route = createFileRoute('/$userId/edit')({
  component: EditUserFeature,
});
