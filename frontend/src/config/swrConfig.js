export const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateIfStale: false,
  shouldRetryOnError: true,
  onErrorRetry: (error, key, config, revalidate, context) => {
    if (context.retryCount >= 2) return;

    if (config.method && config.method !== 'get') return;

    // const status = error?.response?.status;
    // if ([400, 401, 403].includes(status)) return;

    // clear existing timeout if any
    if (context.retryTimeout) {
      clearTimeout(context.retryTimeout);
    }

    context.retryTimeout = setTimeout(
      () => {
        revalidate({ retryCount: context.retryCount + 1 });
      },
      1000 * Math.pow(2, context.retryCount)
    );
  }
};
