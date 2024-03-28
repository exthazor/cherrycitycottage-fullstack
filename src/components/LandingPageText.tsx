import React from "react";

export function LandingPageText(props: any) {
  const outlineStyle = {
    textShadow: `
      -1px -1px 0 #000,  
       1px -1px 0 #000,
      -1px  1px 0 #000,
       1px  1px 0 #000,
      -2px  0   0 #000,
       2px  0   0 #000,
       0   -2px 0 #000,
       0    2px 0 #000
    `
  };

  return (
    <>
      <div className="md:mt-20 mb-5 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white" style={outlineStyle}>
          Welcome to Cherry City Cottage
        </h1>
      </div>
      <div className="text-center px-4">
        <p className="text-xl md:text-2xl text-white" style={outlineStyle}>
          A cozy retreat in the heart of Guwahati, where comfort meets tranquility.
        </p>
      </div>
    </>
  );
}

export default LandingPageText;
