// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const ssr = true;
export const csr = false;
export const prerender = false;