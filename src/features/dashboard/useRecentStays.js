import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../services/apiBookings';

export function useRecentStays() {
  //從URL取得篩選範圍（default: 7）
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get('last') ? 7 : +searchParams.get('last');

  //計算出日期
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ['stays', `last-${numDays}`],
  });

  //stays需為「已確認」的狀態（不能為「unconfirmed」
  const confirmedStays = stays?.filter((stay) => stay.status !== 'unconfirmed');

  return { isLoading, stays, confirmedStays, numDays };
}
