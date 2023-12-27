import React from 'react';
import Image from 'next/image'
import { Flex ,Text } from '@mantine/core';

const Logo = () => {
  return (
    <div className="logo-container" style={{ display: 'flex', alignItems: 'center' }}>
      <Flex
      mih={50}     
      gap="xs"
      justify="flex-start"
      align="center"
      direction="row"
      wrap="wrap"
    >
      <Image src="/logo.png" alt="me"  width={42}  height={32}/>     
      <Text
      size="xl"
      fw={900}
      variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
    >
      JDOCode
    </Text> 
      </Flex>
    </div>
  );
};

export default Logo;
