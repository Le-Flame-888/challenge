import Stack from "@mui/material/Stack";
import { format, formatDistanceToNow } from "date-fns";

export const dateTimeRender = (value: string) => {
  if (!value) {
    return <div className="text-sm text-muted-foreground">Invalid date</div>;
  }
  const date = new Date(value);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return <div className="text-sm text-muted-foreground">Invalid date</div>;
  }

  return (
    <Stack spacing={0.5}>
      <span>
        {formatDistanceToNow(date, { addSuffix: true })}
      </span>
      <span>
        {format(date, 'MMM dd, yyyy • HH:mm')}
      </span>
    </Stack>
  );
};