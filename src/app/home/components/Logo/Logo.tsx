import React from 'react';
import Image from 'next/image'

const Logo = () => {
  return (
    <div className="logo-container" style={{ display: 'flex', alignItems: 'center' }}>
      <Image src="/logo3.png" alt="me"  width={100}  height={36}/>      
    </div>
  );
};

export default Logo;
