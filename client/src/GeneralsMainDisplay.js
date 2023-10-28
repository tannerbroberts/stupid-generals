import React, { useRef, useEffect } from 'react';

function GeneralsMainDisplay() {
  const canvasRef = useRef(null);

  return <canvas ref={canvasRef} />;
}

export default GeneralsMainDisplay;
