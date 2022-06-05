import * as FetchUtils from '@/utils/fetch';
import { ApiReturn } from './interface';

export const fetchPage = (params: any, headers = {}): Promise<ApiReturn> => {
  return FetchUtils.fetchPost(`${API_PREFIX}/dsMgr/ds/query`, {
    body: params,
    headers
  }) as any;
}

export const fetchLogin = (params: any, headers = {}): Promise<any> => {
  return FetchUtils.fetchPost("https://api-takumi.mihoyo.com/account/auth/api/webLoginByPassword", {
    body: params,
    headers
  });
}
