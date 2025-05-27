export interface SecurityInfo {
  lastIpAddress: string;
  loginAttempts: number;
  securityQuestions: any[];
  _id: string;
}

export interface UserType {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  accountStatus: string;
  emailVerified: boolean;
  is_activated: boolean;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  created_at: string;
  updated_at: string;
  profilePicture: string;
  avatar: string;
  password: string;
  orderHistory: any[];
  portfolio: any[];
  security: SecurityInfo;
  twoFactorAuthEnabled: boolean;
}

export interface UserSecurity {
  lastIpAddress: string;
  loginAttempts: number;
  securityQuestions: any[];
  _id: string;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  profilePicture: string;
  avatar: string;
  role: 'Customer' | 'Admin' | string;
  accountStatus: 'Active' | 'Inactive' | string;
  emailVerified: boolean;
  twoFactorAuthEnabled: boolean;
  orderHistory: any[];
  security: UserSecurity;
  portfolio: any[];
  is_activated: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token: string;
}

export interface GetUserByIdResponse {
  isSuccess: boolean;
  data: User[];
  statusCode: number;
  message: string;
}

export interface userDataUpdateRequest {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  notifications?: {
    email?: boolean;
    push?: boolean;
    sms?: boolean;
    marketing?: boolean;
  };
  privacy?: {
    profileVisible?: boolean;
    showEmail?: boolean;
    showPhone?: boolean;
  };
}
