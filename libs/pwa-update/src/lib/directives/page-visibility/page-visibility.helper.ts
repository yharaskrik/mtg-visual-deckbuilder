// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const document: any;

export const pageVisibilityApiSupport = () => {
  let hidden = 'hidden';
  let visibilityChange = 'visibilitychange';

  if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
  }

  if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
  }

  return { hidden, visibilityChange } as const;
};
