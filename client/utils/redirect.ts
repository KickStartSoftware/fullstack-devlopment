import Router from 'next/router';

// a sign in redirect function for next js that takes users to the sign in page
export const redirect = () => {
  return Router.push('/');
};
