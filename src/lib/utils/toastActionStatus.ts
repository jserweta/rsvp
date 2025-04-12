import { toast } from 'sonner';
import { ActionStatus } from '../definitions';

export const toastActionStatus = ({ message, type }: ActionStatus) => {
  if (!message) return;

  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'info':
      toast.info(message);
      break;
  }
};
