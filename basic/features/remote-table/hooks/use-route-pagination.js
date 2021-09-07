import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

export const useRoutePagination = (pathname, defaultPageSize = 10) => {
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
  };
};
