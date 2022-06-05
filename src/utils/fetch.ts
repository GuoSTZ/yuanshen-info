import { ApiReturn } from "@/interface";

// 默认的Headers
const defaults: RequestInit = {
  credentials: 'include',
  mode: 'cors',
  headers: {
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,fr;q=0.7",
    "Connection": "keep-alive",
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
    Pragma: 'no-cache',
    "Host": "api-takumi.mihoyo.com",
    "Origin": "https://bbs.mihoyo.com",
    "Referer": "https://bbs.mihoyo.com/",
  },
};

// 合并Options
const combineOptions = (
  options: RequestInit = {},
  newOptions: RequestInit = {}
): RequestInit => {
  const _options = Object.assign({}, defaults, options, newOptions, {
    // headers: Object.assign({}, options.headers, newOptions.headers),
  });
  _options.body = JSON.stringify(_options.body);
  return _options;
}

const fetchRequest = (url: string, params: any) => {
  console.log(params, '====params')
  return fetch(url, params)
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => console.log(error));
}

export const fetchPost = (url: string, params: any) => {
  const defaultParams = {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Pragma: 'no-cache',
    },
    method: 'POST',
  }
  return fetchRequest(url, combineOptions(defaultParams, params));
}

export const fetchGet = (url: string, params: any) => {
  const defaultParams = {
    method: 'GET',
  };
  return fetchRequest(url, combineOptions(defaultParams, params));
}