import React from "react";

const Freelancer = () => {
  return (
    <div className="">
      <button
        onClick={() =>
          window.location.assign(
            "https://sites.google.com/view/sistema-cic/asistencia-para-freelancers"
          )
        }
        className="freelancer-button"
      ></button>
    </div>
  );
};

export default Freelancer;
