import { useEffect, useState } from 'react';

const useDynamicFetch = (initialFetcher = null) => {
  const [fetcher, setFetcher] = useState(initialFetcher);
  const [refetch, setRefetch] = useState(false);
  const [result, setResult] = useState({
    loading: initialFetcher ? true : false,
    data: null
  });

  useEffect(() => {
    let active = true;

    if (fetcher) {
      setResult((prev) => ({ ...prev, loading: true }));

      const finalFetcher = typeof fetcher === 'function' ? fetcher() : fetcher;

      finalFetcher
        .then(({ data, success }) => {
          if (active) {
            setResult((prev) => ({
              ...prev,
              loading: false,
              data: success ? data : null
            }));
          }
        })
        .catch((error) => {
          if (active) {
            setResult((prev) => ({
              ...prev,
              loading: false,
              data: null,
              error: error?.response?.data || error?.message
            }));
          }
        });
    } else {
      setResult({
        loading: false,
        data: null
      });
    }

    return () => {
      active = false;
    };
  }, [fetcher, refetch]);

  // First index returns result state with data, loading, and optionally error
  // Second index returns a function to set-fetcher manually and refetch data, set empty string (null) to reset the result state
  return [
    result,
    (newFetcher) => {
      setFetcher(() => newFetcher);
      setRefetch((prev) => !prev);
    }
  ];
};

export default useDynamicFetch;
