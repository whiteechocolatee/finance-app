'use client';

import { useUser } from '@clerk/nextjs';

const WelcomeMessage = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className='space-y-2 mb-4'>
      <h2 className='text-2xl lg:text-4xl text-white font-medium'>
        Здравствуйте{isLoaded ? ', ' : ' '}
        {user?.firstName
          ? user.firstName
          : user?.username}{' '}
        👋🏻
      </h2>
      <p className='text-sm lg:text-base text-[#89b6fd]'>
        Это ваш финансовый отчет
      </p>
    </div>
  );
};

export default WelcomeMessage;
