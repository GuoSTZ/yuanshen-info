export interface IAction {
  fetchPage: (params: any) => Promise<void>;
  fetchLogin: (params: any) => Promise<void>;
}

export interface ApiReturn {
  code: number;
  data: any;
  message: string;
  success: boolean;
}