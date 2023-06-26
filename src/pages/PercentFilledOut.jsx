import React, { useState, useEffect } from 'react';

const ProgressBar = ({ percentage }) => {
 const [width, setWidth] = useState(0);


 useEffect(() => {
   setWidth(percentage);
 }, [percentage]);


 return (
   <div className="progress-bar">
     <div
       className="progress-bar-fill"
       style={{ width: `${width}%` }}
     ></div>
   </div>
 );
};

const FormPage = () => {
 // Assume the percentage value is received from an API or calculated elsewhere
 const percentageFilled = 50;


 return (
   <div>
     {/* Other form elements */}
     <ProgressBar percentage={percentageFilled} />
     {/* Other form elements */}
   </div>
 );
};

export default FormPage;
