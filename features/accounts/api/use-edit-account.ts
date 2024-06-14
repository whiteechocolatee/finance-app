import { InferRequestType, InferResponseType } from 'hono';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { client } from '@/lib/hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
  (typeof client.api.accounts)[':id']['$patch']
>;
type RequestType = InferRequestType<
  (typeof client.api.accounts)[':id']['$patch']
>['json'];

export const useEditAccount = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await client.api.accounts[':id'][
        '$patch'
      ]({ json, param: { id } });
      return await response.json();
    },
    onSuccess: () => {
      toast.success('Счет обновлен!');
      queryClient.invalidateQueries({
        queryKey: ['account', { id }],
      });
      queryClient.invalidateQueries({
        queryKey: ['accounts'],
      });
      queryClient.invalidateQueries({
        queryKey: ['transactions'],
      });
      queryClient.invalidateQueries({
        queryKey: ['summary'],
      });
    },
    onError: () => {
      toast.error('Не удалось редактировать счет');
    },
  });

  return mutation;
};
