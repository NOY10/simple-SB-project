import { useEffect, useState } from 'react';

import axiosService from '../utils/axios';

const useGetMethod = (initialUrl = '', initialLoader = false) => {
  const [url, setUrl] = useState(initialUrl); // Use initialUrl to call api on mount
  const [preLoader, setPreLoader] = useState(initialLoader); // Loader for api call that waits for url
  const [refetch, setRefetch] = useState(false); // Refetch data on api recall
  const [result, setResult] = useState({
    loading: initialUrl || initialLoader ? true : false,
    data: {}
  });

  useEffect(() => {
    // Call api if url is found else reset state
    if (url) {
      setResult((prevResult) => ({
        ...prevResult,
        loading: true
      }));
      // Invalidate pre-loader state after first api call
      setPreLoader(false);

      axiosService
        .get(url)
        .then((response) => {
          setResult((prevResult) => ({
            ...prevResult,
            loading: false,
            data: response?.data || {}
          }));
        })
        .catch((error) => {
          setResult((prevResult) => ({
            ...prevResult,
            loading: false,
            data: {},
            error: error?.response?.data
          }));
        });
    } else {
      setResult({
        loading: preLoader || false,
        data: {}
      });
    }
    //eslint-disable-next-line
  }, [url, refetch]);

  // First index returns result state with data, loading, and optionally error
  // Second index returns a function to set-url manually and refetch data, set empty string ("") to reset the result state
  return [
    result,
    (newUrl) => {
      setUrl(newUrl);
      setRefetch((prevRefetch) => !prevRefetch); // Toggle the refetch to force useEffect and refetch data
    }
  ];
};

export default useGetMethod;
