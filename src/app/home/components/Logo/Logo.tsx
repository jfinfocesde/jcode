import React from 'react';
import Image from 'next/image'

const Logo = () => {
  return (
    <div className="logo-container" style={{ display: 'flex', alignItems: 'center' }}>
      <Image src="/logo7.png" alt="me"  width={120}  height={36}/>      
    </div>
  );
};

export default Logo;
