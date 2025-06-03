export type NotificationType = 'thread_invitation' | 'bead_purchase_request';

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

export interface beadReqDetails {
  isOpen: boolean;
  reqId: string;
  beadId: string;
  buyerID: string;
  offerPrice: number;
  message: string;
  threadName: string;
  status?: string;
  threadId: string;
}

export interface InitialStateType {
  refecthNotification: boolean;
  beadRequestRes: beadReqDetails;
}
