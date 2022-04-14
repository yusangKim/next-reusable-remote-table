import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

export const useRoutePagination = (
  pathname,
  defaultPageSize = 10,
  userId = ''
) => {
  const router = useRouter();

  const setPageIndex = useCallback(
    (page) => {
      void router.push({
        pathname,
        query: { ...router.query, page },
      });
    },
    [router, pathname]
  );

  const setPageSize = useCallback(
    (per_page) => {
      void router.push({
        pathname,
        query: { ...router.query, page: 0, per_page },
      });
    },
    [router, pathname]
  );

  const filters = useMemo(() => {
    console.log(router.query);
    return {
      userId: router.query.userId !== '' ? router.query.userId : '',
      completed: router.query.completed !== '' ? router.query.completed : '',
    };
  }, [router, pathname]);

  const setFilters = useCallback(
    (filters) => {
      const userId = filters?.userId;
      const completed = filters?.completed;
      console.log('실행', filters);
      router.push({
        pathname,
        query: { ...router.query, page: 0, userId, completed },
      });
    },
    [router, pathname]
  );
  const pageIndex = useMemo(() => Number(router.query.page ?? 0), [router]);
  const pageSize = useMemo(
    () => Number(router.query.per_page ?? defaultPageSize),
    [defaultPageSize, router]
  );

  return {
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
    setFilters,
    filters,
  };
};
