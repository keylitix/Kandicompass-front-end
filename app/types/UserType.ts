export interface UserNotifications {
  email: boolean;
  marketing: boolean;
  push: boolean;
  sms: boolean;
  _id?: string;
}

export interface UserPrivacy {
  profileVisible: boolean;
  showEmail: boolean;
  showPhone: boolean;
  _id?: string;
}

export interface UserLocation {
  city: string;
  country: string;
  lat: number;
  lon: number;
  _id?: string;
}

export interface UserSecurity {
  lastIpAddress: string;
  loginAttempts: number;
  securityQuestions: any[];
  _id: string;
}

export interface UserType {
  id: string;
  _id: string;
  fullName: string;
  bio: string;
  email: string;
  phoneNumber: string;
  role: string;
  accountStatus: 'Active' | 'Inactive' | string;
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
  twoFactorAuthEnabled: boolean;
  token: string;
  securityQuestions: any[];
  location: UserLocation;
  notifications: UserNotifications;
  privacy: UserPrivacy;
  security: UserSecurity;
  __v: number;
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
  bio: string;
  password: string;
  phoneNumber: string;
  profilePicture: string;
  avatar: string;
  role: 'Customer' | 'Admin' | string;
  accountStatus: 'Active' | 'Inactive' | string;
  emailVerified: boolean;
  twoFactorAuthEnabled: boolean;
  orderHistory: any[];
  portfolio: any[];
  is_activated: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  createdAt: string;
  updatedAt: string;
  location: UserLocation;
  notifications: UserNotifications;
  privacy: UserPrivacy;
  security: UserSecurity;
  __v: number;
  token: string;
}

export interface GetUserResponse {
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

export interface UpdateUserProfileResponse {
  isSuccess: boolean;
  statusCode: number;
  message: string;
  data: User;
}
