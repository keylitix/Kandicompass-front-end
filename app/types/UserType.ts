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
  password: string;
  orderHistory: any[];
  portfolio: any[];
  security: SecurityInfo;
  twoFactorAuthEnabled: boolean;
  token: string;
}
