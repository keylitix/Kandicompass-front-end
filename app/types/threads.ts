// send invitation
export interface sendInvitationRequest {
  email: string;
  threadId: string;
}
export interface SendInvitationResponse {
  isSuccess: boolean;
  data: {
    inviteId: string;
    token: string;
  };
  statusCode: number;
  message: string;
}

// get invitations
export interface Invitation {
  _id: string;
  threadId: string;
  threadName: string;
  email: string;
  status: 'pending' | 'accepted' | 'declined';
  token: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetInvitationsResponse {
  isSuccess: boolean;
  data: Invitation[];
  statusCode: number;
  message: string;
}

// respond to invitation
export interface RespondToInvitationRequest {
  inviteId: string;
  accept: boolean;
}

export interface Responde {
    success: boolean;
    threadId: string;
    status: 'accepted' | 'pending' | 'declined';
  }

export interface RespondToInvitationResponse {
  isSuccess: boolean;
  data: Responde;
  statusCode: number;
  message: string;
}
