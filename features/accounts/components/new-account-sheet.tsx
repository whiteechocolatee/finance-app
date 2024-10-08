import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { insertAccountSchema } from '@/db/schema';
import { useCreateAccount } from '@/features/accounts/api/use-create-account';
import { useNewAccount } from '@/features/accounts/hooks/use-new-account';
import * as z from 'zod';
import { AccountForm } from './account-form';

const formSchema = insertAccountSchema.pick({ name: true });

type FormValues = z.input<typeof formSchema>;

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();

  const mutation = useCreateAccount();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='space-y-4'>
        <SheetHeader>
          <SheetTitle>Новый счет</SheetTitle>
          <SheetDescription>
            Создайте новый счет чтобы следить за ним
          </SheetDescription>
        </SheetHeader>
        <AccountForm
          defaultValues={{
            name: '',
          }}
          onSubmit={onSubmit}
          disabled={mutation.isPending}
        />
      </SheetContent>
    </Sheet>
  );
};
