'use client';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, Plus } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { useBulkDeleteTransactions } from '@/features/transactions/api/use-bulk-delete-transactions';
import { useGetTransactions } from '@/features/transactions/api/use-get-transactions';
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction';
import { columns } from './columns';
import { useState } from 'react';
import { UploadButton } from './upload-button';
import { ImportCard } from './import-card';

enum VARIANTS {
  LIST = 'LIST',
  IMPORT = 'IMPORT',
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

const TransactionsPage = () => {
  const [variant, setVariant] = useState<VARIANTS>(
    VARIANTS.LIST,
  );
  const [importResults, setImportResults] = useState(
    INITIAL_IMPORT_RESULTS,
  );

  const onUpload = (
    results: typeof INITIAL_IMPORT_RESULTS,
  ) => {
    console.log({ results });

    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };

  const newTransaction = useNewTransaction();
  const deleteTransactions = useBulkDeleteTransactions();
  const transactionQuery = useGetTransactions();
  const transactions = transactionQuery.data || [];

  const isDisabled =
    transactionQuery.isLoading ||
    deleteTransactions.isPending;

  if (transactionQuery.isLoading) {
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

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <ImportCard
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmit={() => {}}
        />
      </>
    );
  }

  return (
    <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
      <Card className='border-none drop-shadow-sm'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          <CardTitle className='text-xl line-clamp-1'>
            Transactions History
          </CardTitle>
          <div className='flex flex-col lg:flex-row gap-y-2 items-center gap-x-2'>
            <Button
              className='w-full lg:w-auto'
              onClick={newTransaction.onOpen}
              size='sm'>
              <Plus className='size-4 mr-2' />
              Add new
            </Button>
            <UploadButton onUpload={onUpload} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);

              deleteTransactions.mutate({ ids });
            }}
            filterKey='payee'
            columns={columns}
            data={transactions}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;
