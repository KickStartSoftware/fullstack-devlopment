import React from 'react';
import classNames from 'classnames';

export interface IProgress {
  percentage: number;
}

const Progress: React.FC<IProgress> = ({ percentage }) => {
  const barClass = classNames(
    'bg-primary-main h-full transition-all  rounded-t-xl rounded-br-xl'
  );

  return (
    <div className="w-full h-[6px] rounded-t-lg bg-gray-200 rounded-t-xl">
      <div
        className={barClass}
        style={{
          width: `${percentage}%`,
        }}
      />
    </div>
  );
};

export default Progress;
