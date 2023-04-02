import React from 'react';
import useBaseAnalytics from '../../hooks/base-analytics';

const Repository = () => {
  const { baseAnalytics } = useBaseAnalytics();
  return (
    <div className="bg-[#040d18]">
      <div className="bg-[#041d33] text-white font-semibold   flex flex-col justify-center items-center pb-8 md:pb-20 rounded-b-[2rem] md:rounded-b-[3rem]">
        <div className="sm:flex gap-4 text-[40px]  text-center">
          <p>Database</p>
          <p>Repository</p>
        </div>
        <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  sm:gap-12  ">
          <div className="text-center">
            <p className="text-[45px]">{baseAnalytics.packages}</p>
            <p className="text-[20px]">Softwares</p>
          </div>
          <div className="text-center  ">
            <p className="text-[45px]">{baseAnalytics.downloads}</p>
            <p className="text-[20px]">Downloads</p>
          </div>

          <div className="text-center  ">
            <p className="text-[45px]">{baseAnalytics.collections}</p>
            <p className="text-[20px]">Saved Vault</p>
          </div>

          <div className="text-center  ">
            <p className="text-[45px]">{baseAnalytics.users}</p>
            <p className="text-[20px]">Users</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repository;
