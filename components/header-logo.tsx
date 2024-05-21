import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HeaderLogo = () => {
  return (
    <Link href='/'>
      <div className='items-center hidden lg:flex'>
        <Image
          src='/logo-header.svg'
          width={30}
          height={30}
          alt='logo'
        />
        <p className='font-semibold text-white text-2xl ml-2.5'>
          PennyPlanner
        </p>
      </div>
    </Link>
  );
};

export default HeaderLogo;
