import { FormControl, FormHelperText, InputLabel, MenuItem, Select, type SelectProps } from '@mui/material';
import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form';

interface Option {
  value: string | number;
  label: string;
}

type ControlledSelectProps<T extends FieldValues> = UseControllerProps<T> & Omit<SelectProps, 'name' | 'defaultValue'> & {
  options: Option[];
};

export function ControlledSelect<T extends FieldValues>({ name, control, rules, options, label, ...rest }: ControlledSelectProps<T>) {
  const { field, fieldState: { error } } = useController({ name, control, rules });

  return (
    <FormControl fullWidth error={!!error}>
      <InputLabel>{label}</InputLabel>
      <Select {...field} {...rest} label={label}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
}
