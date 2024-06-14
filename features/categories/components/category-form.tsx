import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { insertCategorySchema } from '@/db/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = insertCategorySchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const CategoryForm = ({
  id,
  defaultValues,
  disabled,
  onSubmit,
  onDelete,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };
  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        className='space-y-4 pt-4'
        onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder='пр. Еда, Такси, др.'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className='w-full' disabled={disabled}>
          {id ? 'Сохранить изменения' : 'Создать категорию'}
        </Button>
        {!!id && (
          <Button
            type='button'
            disabled={disabled}
            onClick={handleDelete}
            className='w-full'
            variant='outline'>
            <Trash className='size-4 mr-2' />
            Удалить категорию
          </Button>
        )}
      </form>
    </Form>
  );
};
