import React from 'react';
import { Image } from 'react-bootstrap';
function RoundImage({ src }) {
  return (
    <>
      <Image src={src} roundedCircle />
    </>
  );
}

export default RoundImage;
