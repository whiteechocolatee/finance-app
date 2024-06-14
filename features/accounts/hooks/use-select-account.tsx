import { Select } from '@/components/select';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCreateAccount } from '@/features/accounts/api/use-create-account';
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts';
import { useRef, useState } from 'react';

export const useSelectAccount = (): [
  () => JSX.Element,
  () => Promise<unknown>,
] => {
  const accountsQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) => {
    accountMutation.mutate({ name });
  };
  const accountOptions = (accountsQuery.data ?? []).map(
    (account) => ({
      label: account.name,
      value: account.id,
    }),
  );

  const [promise, setPromise] = useState<{
    resolve: (value: string | undefined) => void;
  } | null>(null);

  const selectValue = useRef<string>();

  const confirm = () =>
    new Promise((resolve, reject) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(selectValue.current);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(undefined);
    handleClose();
  };

  const ConfirmationDialog = () => {
    return (
      <Dialog open={promise !== null}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Выберите счет</DialogTitle>
            <DialogDescription>
              Пожалуйста, выберите счет, чтобы продолжить
            </DialogDescription>
          </DialogHeader>
          <Select
            placeholder='Select an account'
            options={accountOptions}
            onCreate={onCreateAccount}
            onChange={(value) =>
              (selectValue.current = value)
            }
            disabled={
              accountsQuery.isLoading ||
              accountMutation.isPending
            }
          />
          <DialogFooter className='pt-2'>
            <Button
              variant='outline'
              onClick={handleCancel}>
              Отменить
            </Button>
            <Button onClick={handleConfirm}>
              Подтвердить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return [ConfirmationDialog, confirm];
};
