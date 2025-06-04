// Thread
export interface Thread {
  _id: string;
  threadName: string;
  description: string;
  ownerId: string;
  owner: string;
  qrCode: string;
  created_at: string;
  updated_at: string;
  is_activated: boolean;
  is_deleted: boolean;
  memberCount: number;
  members: string[];
  beads: any[];
  visibility: 'Public' | 'Private';
  __v: number;
}

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

// delete response
export interface ThreadDeleteResponse {
  isSuccess: boolean;
  message: string;
  statusCode: number;
}

//update thread
export interface ThreadUpdateRequest {
  _id?: string;
  threadName: string | undefined;
  description: string | undefined;
  visibility: 'Public' | 'Private';
}
