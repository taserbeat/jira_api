// authSlice.ts
export interface LoginUser {
  id: number;
  username: string;
}

export interface Avatar extends Blob {
  readonly lastModified: number;
  readonly name: string;
}

export interface Profile {
  id: number;
  userProfile: number;
  img: string | null;
}

export interface PostProfile {
  id: number;
  img: File | null;
}

export interface Credential {
  username: string;
  password: string;
}

export interface Jwt {
  refresh: string;
  access: string;
}

export interface User {
  id: number;
  username: string;
}

export interface AuthState {
  isLoginView: boolean;
  loginUser: LoginUser;
  profiles: Profile[];
}
