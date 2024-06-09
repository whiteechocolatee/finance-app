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
import { Loader2, Plus } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { useBulkDeleteAccounts } from '@/features/accounts/api/use-bulk-delete';
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts';
import { columns } from './columns';

const AccountsPage = () => {
  const newAccount = useNewAccount();
  const deleteAccounts = useBulkDeleteAccounts();
  const accountsQuery = useGetAccounts();
  const accounts = accountsQuery.data || [];

  const isDisabled =
    accountsQuery.isLoading || deleteAccounts.isPending;

  if (accountsQuery.isLoading) {
    return (
      <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
        <Card className='border-none drop-shadow-sm'>
          <CardHeader>
            <Skeleton className='w-48 h-8' />
          </CardHeader>
          <CardContent>
            <div className='h-[500px] w-full items-center justify-center flex'>
              <Loader2 className='animate-spin size-6 text-slate-300' />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);

              deleteAccounts.mutate({ ids });
            }}
            filterKey='email'
            columns={columns}
            data={accounts}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
