export const dva = {
  config: {
    onError(err: ErrorEvent) {
      err.preventDefault();
      // tslint:disable-next-line
      console.error('[umi error]: ', err.message);
    },
  },
};
