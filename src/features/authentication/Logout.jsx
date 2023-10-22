import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogout } from './useLogout';

import ButtonIcon from '../../ui/ButtonIcon';
import SpinnerMini from '../../ui/SpinnerMini';

function Logout() {
  const { isLoginOut, logout } = useLogout();
  return (
    <ButtonIcon onClick={logout} disabled={isLoginOut}>
      {!isLoginOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
