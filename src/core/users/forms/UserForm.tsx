import { 
  Button, 
  Stack, 
  FormControlLabel, 
  Box, 
  MenuItem, 
  TextField, 
  Switch, 
  Typography,
  Paper,
  FormHelperText
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { CreateUserType, UserType } from '@/core/users/types/user.type';

const userSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  profile: yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    age: yup.number().min(0, 'Age must be positive').nullable(),
  }),
  role: yup.string().oneOf(['admin', 'user', 'guest']).required('Role is required'),
  isActive: yup.boolean().default(true),
});

type FormData = yup.InferType<typeof userSchema>;

interface UserFormProps {
  onSubmit: (data: CreateUserType) => void;
  isPending: boolean;
  defaultValues?: Partial<UserType>;
  submitButtonText?: string;
}

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
  { value: 'guest', label: 'Guest' },
];

export function UserForm({ 
  onSubmit, 
  isPending, 
  defaultValues,
  submitButtonText = 'Submit'
}: UserFormProps) {
  const { 
    control, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      email: defaultValues?.email || '',
      profile: {
        firstName: defaultValues?.profile?.firstName || '',
        lastName: defaultValues?.profile?.lastName || '',
        age: defaultValues?.profile?.age,
      },
      role: (defaultValues?.role as 'admin' | 'user' | 'guest') || 'user',
      isActive: defaultValues?.isActive ?? true,
    },
  });

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack spacing={3}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <div>
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </div>
            )}
          />

          <Stack direction="row" spacing={2}>
            <Controller
              name="profile.firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  error={!!errors.profile?.firstName}
                  helperText={errors.profile?.firstName?.message}
                />
              )}
            />
            <Controller
              name="profile.lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  error={!!errors.profile?.lastName}
                  helperText={errors.profile?.lastName?.message}
                />
              )}
            />
          </Stack>

          <Controller
            name="profile.age"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Age"
                type="number"
                fullWidth
                value={field.value || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === '' ? null : Number(value));
                }}
                error={!!errors.profile?.age}
                helperText={errors.profile?.age?.message}
                inputProps={{ min: 0 }}
              />
            )}
          />

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <TextField
                select
                label="Role"
                fullWidth
                {...field}
                error={!!errors.role}
                helperText={errors.role?.message}
              >
                {roleOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={field.value}
                    onChange={field.onChange}
                    color="primary"
                  />
                }
                label={field.value ? 'Active' : 'Inactive'}
                labelPlacement="start"
                sx={{ justifyContent: 'space-between', ml: 0, mr: 0 }}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={isPending}
            sx={{ mt: 2 }}
          >
            {isPending ? 'Saving...' : submitButtonText}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
