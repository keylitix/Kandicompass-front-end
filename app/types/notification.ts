export type NotificationType = 'thread_invitation' | 'marketing' | 'system';

export interface AppNotification {
  id: string | number;
  title: string;
  content: string;
  time: string;
  type: NotificationType;
  status: 'pending' | 'accepted' | 'declined';
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
}
