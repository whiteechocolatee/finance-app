'use client';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useBulkDeleteCategories } from '@/features/categories/api/use-bulk-delete-categories';
import { useGetCategories } from '@/features/categories/api/use-get-categories';
import { useNewCategory } from '@/features/categories/hooks/use-new-category';
import { Loader2, Plus } from 'lucide-react';
import { columns } from './columns';

const CategoriesPage = () => {
  const newCategory = useNewCategory();
  const deleteCategory = useBulkDeleteCategories();
  const categoriesQuery = useGetCategories();
  const categories = categoriesQuery.data || [];

  const isDisabled =
    categoriesQuery.isLoading || deleteCategory.isPending;

  if (categoriesQuery.isLoading) {
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
            Categories Page
          </CardTitle>
          <Button onClick={newCategory.onOpen} size='sm'>
            <Plus className='size-4 mr-2' />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);

              deleteCategory.mutate({ ids });
            }}
            filterKey='name'
            columns={columns}
            data={categories}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesPage;
