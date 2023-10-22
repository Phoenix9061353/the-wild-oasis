import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading: isLoginOut } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      //記得移除query裡的使用者記錄
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
  });

  return { logout, isLoginOut };
}
