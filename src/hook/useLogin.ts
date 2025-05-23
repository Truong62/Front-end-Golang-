import {useMutation} from '@tanstack/react-query';

type LoginProps = {
  email: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  token?: string;
  message?: string;
};

const loginRequest = async (body: LoginProps): Promise<LoginResponse> => {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'error');
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginProps>({
    mutationFn: loginRequest,
  });
}
