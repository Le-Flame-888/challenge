import { TextField, type TextFieldProps } from '@mui/material';
import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form';

type ControlledTextFieldProps<T extends FieldValues> = UseControllerProps<T> & Omit<TextFieldProps, 'name' | 'defaultValue'>;

export function ControlledTextField<T extends FieldValues>({ name, control, rules, ...rest }: ControlledTextFieldProps<T>) {
  const { field, fieldState: { error } } = useController({ name, control, rules });

  return (
    <TextField
      {...field}
      {...rest}
      error={!!error}
      helperText={error?.message}
    />
  );
}
