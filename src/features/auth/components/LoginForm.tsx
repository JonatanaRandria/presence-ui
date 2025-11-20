import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { InputField } from '@/components/Form';
import { useLoginUser } from '../hooks/useLoginUser';
import type { LoginCredentials, User } from '../types/auth';

const schema: yup.ObjectSchema<LoginCredentials> = yup.object({
  email: yup.string().required('Valid emai is required'),
  password: yup.string().required('Password is required'),
  remember: yup.boolean(),
});

type LoginFormProps = { onSuccess?: (user: User) => void };

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  // Demo data
  const defaultValues = {
    email : 'johndoe@test.com',
    password: '123456',
  };

  const { onSubmit, register, errors, isSubmitting } = useLoginUser({
    schema,
    defaultValues,
    onSuccess,
  });

  return (
    <>
      <h1 className='h3 mb-3 fw-normal'>Please sign in</h1>
      <p className='mb-1 text-body-secondary fst-italic'>
      </p>

      <form onSubmit={onSubmit}>
        <InputField
          {...register('email')}
          invalidFeedback={errors.email?.message}
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          disabled={isSubmitting}
          type='email'
          placeholder='email *'
          label='email *'
        />

        <InputField
          {...register('password')}
          invalidFeedback={errors.password?.message}
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          disabled={isSubmitting}
          type='password'
          placeholder='Password'
          label='Password *'
        />

       

        <button className='btn btn-primary w-100 py-2 mt-2' type='submit' disabled={isSubmitting}>
          Submit
        </button>

        {errors.root?.serverError ? (
          <div className='alert alert-danger mt-2'>{errors.root.serverError.message}</div>
        ) : null}
      </form>
    </>
  );
};
