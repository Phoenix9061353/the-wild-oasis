import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';

import Spinner from '../ui/Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);

  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1. Load authenticated user
  const { isLoading, isAuthenticated, fetchStatus } = useUser();

  //2. 如果沒有認證使用者登入 → 導至「登入」頁面
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading && fetchStatus !== 'fetching')
        navigate('/login');
    },
    [isAuthenticated, isLoading, navigate, fetchStatus]
  );

  //3. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4. 確認有使用者登入 → 顯示App頁面
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
