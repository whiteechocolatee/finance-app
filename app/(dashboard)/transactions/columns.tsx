'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { InferResponseType } from 'hono';

import { Badge } from '@/components/ui/badge';
import { client } from '@/lib/hono';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { AccountColumn } from './account-column';
import { Actions } from './actions';
import { CategoryColumn } from './category-column';
import { ru } from 'date-fns/locale';

export type ResponseType = InferResponseType<
  typeof client.api.transactions.$get,
  200
>['data'][0];

export const columns: ColumnDef<ResponseType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() &&
            'indeterminate')
        }
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) =>
          row.toggleSelected(!!value)
        }
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }>
          Дата
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue('date') as Date;

      return (
        <span>
          {format(date, 'dd MMMM, yyyy', {
            locale: ru,
          })}
        </span>
      );
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }>
          Категория
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      console.log(row.original);

      return (
        <CategoryColumn
          id={row.original.id}
          category={row.original.category}
          categoryId={row.original.categoryId}
        />
      );
    },
  },
  {
    accessorKey: 'payee',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }>
          Источник
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }>
          Сумма
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));

      return (
        <Badge
          className='text-xs font-md px-3.5 py-2.5'
          variant={amount < 0 ? 'destructive' : 'primary'}>
          {formatCurrency(amount)}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'account',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === 'asc',
            )
          }>
          Аккаунт
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <AccountColumn
          account={row.original.account}
          accountId={row.original.accountId}
        />
      );
    },
  },
  {
    accessorKey: 'Действия',
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
