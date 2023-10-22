import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getBookingsAfterDate } from '../../services/apiBookings';

export function useRecentBookings() {
  //從URL取得篩選範圍（default: 7）
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get('last') ? 7 : +searchParams.get('last');

  //計算出日期
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ['bookings', `last-${numDays}`],
  });

  return { isLoading, bookings };
}
