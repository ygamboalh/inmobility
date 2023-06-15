import React from 'react';

const Verified = () =>{

  return (
    <div className="flex bg-slate-500 flex-wrap">
      <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">1</div>
          <div className="col-span-1">2</div>
          <div className="col-span-1">3</div>
          <div className="col-span-1">4</div>
          <div className="col-span-1">5</div>
          <div className="col-span-1">6</div>
          <div className="col-span-1">7</div>
          <div className="col-span-1">8</div>
          <div className="col-span-1">9</div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4">2</div>
      <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4">3</div>
      <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4">4</div>
    </div>
  );
}

export default Verified;
