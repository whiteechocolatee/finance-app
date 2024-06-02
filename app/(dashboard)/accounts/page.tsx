'use client';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useNewAccount } from '@/features/accounts/hooks/use-new-account';
import { Plus } from 'lucide-react';

import { columns, Payment } from './columns';

const data: Payment[] = [
  {
    id: '1a2b3c4d',
    amount: 100,
    status: 'pending',
    email: 'user1@example.com',
  },
  {
    id: '2b3c4d5e',
    amount: 200,
    status: 'processing',
    email: 'user2@example.com',
  },
  {
    id: '3c4d5e6f',
    amount: 300,
    status: 'success',
    email: 'user3@example.com',
  },
  {
    id: '4d5e6f7g',
    amount: 400,
    status: 'failed',
    email: 'user4@example.com',
  },
  {
    id: '5e6f7g8h',
    amount: 500,
    status: 'pending',
    email: 'user5@example.com',
  },
  {
    id: '6f7g8h9i',
    amount: 600,
    status: 'processing',
    email: 'user6@example.com',
  },
  {
    id: '7g8h9i0j',
    amount: 700,
    status: 'success',
    email: 'user7@example.com',
  },
  {
    id: '8h9i0j1k',
    amount: 800,
    status: 'failed',
    email: 'user8@example.com',
  },
  {
    id: '9i0j1k2l',
    amount: 900,
    status: 'pending',
    email: 'user9@example.com',
  },
  {
    id: '0j1k2l3m',
    amount: 1000,
    status: 'processing',
    email: 'user10@example.com',
  },
  {
    id: '1k2l3m4n',
    amount: 1100,
    status: 'success',
    email: 'user11@example.com',
  },
  {
    id: '2l3m4n5o',
    amount: 1200,
    status: 'failed',
    email: 'user12@example.com',
  },
  {
    id: '3m4n5o6p',
    amount: 1300,
    status: 'pending',
    email: 'user13@example.com',
  },
  {
    id: '4n5o6p7q',
    amount: 1400,
    status: 'processing',
    email: 'user14@example.com',
  },
  {
    id: '5o6p7q8r',
    amount: 1500,
    status: 'success',
    email: 'user15@example.com',
  },
  {
    id: '6p7q8r9s',
    amount: 1600,
    status: 'failed',
    email: 'user16@example.com',
  },
  {
    id: '7q8r9s0t',
    amount: 1700,
    status: 'pending',
    email: 'user17@example.com',
  },
  {
    id: '8r9s0t1u',
    amount: 1800,
    status: 'processing',
    email: 'user18@example.com',
  },
  {
    id: '9s0t1u2v',
    amount: 1900,
    status: 'success',
    email: 'user19@example.com',
  },
  {
    id: '0t1u2v3w',
    amount: 2000,
    status: 'failed',
    email: 'user20@example.com',
  },
  {
    id: '1u2v3w4x',
    amount: 2100,
    status: 'pending',
    email: 'user21@example.com',
  },
  {
    id: '2v3w4x5y',
    amount: 2200,
    status: 'processing',
    email: 'user22@example.com',
  },
  {
    id: '3w4x5y6z',
    amount: 2300,
    status: 'success',
    email: 'user23@example.com',
  },
  {
    id: '4x5y6z7a',
    amount: 2400,
    status: 'failed',
    email: 'user24@example.com',
  },
  {
    id: '5y6z7a8b',
    amount: 2500,
    status: 'pending',
    email: 'user25@example.com',
  },
];

const AccountsPage = () => {
  const newAccount = useNewAccount();

  return (
    <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
      <Card className='border-none drop-shadow-sm'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          <CardTitle className='text-xl line-clamp-1'>
            Accounts Page
          </CardTitle>
          <Button onClick={newAccount.onOpen} size='sm'>
            <Plus className='size-4 mr-2' />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            onDelete={() => {}}
            filterKey='email'
            columns={columns}
            data={data}
            disabled={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
