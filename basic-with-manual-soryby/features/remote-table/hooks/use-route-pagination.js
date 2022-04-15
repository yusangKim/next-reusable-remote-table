import { route } from 'next/dist/server/router';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

const parsSortBy = (sortBy) => {
  if (!sortBy) {
    return [];
  }
  const [key, direction] = sortBy.split(':');
  return [{ id: key, desc: direction == 'desc' }];
};

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

  const sortBy = useMemo(() => {
    return parsSortBy(router.query.sort);
  }, [router]);

  const setSortBy = useCallback(
    (sortBy) => {
      let sort = '';
      if (sortBy.length > 0) {
        sort = `${sortBy[0].id}:${sortBy[0].desc ? 'desc' : 'asc'}`;
      }

      router.push({
        pathname,
        query: { ...router.query, page: 0, sort },
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
    sortBy,
    setSortBy,
  };
};
