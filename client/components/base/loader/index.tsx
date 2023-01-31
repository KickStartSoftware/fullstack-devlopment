import React from 'react';

export function LoaderRings() {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

function PageLoader() {
  return (
    <div className="gradient h-screen relative text-white flex items-center justify-center">
      <LoaderRings />
    </div>
  );
}

export default PageLoader;
