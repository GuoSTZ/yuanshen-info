import { message } from 'antd';
import * as Api from './api';
import { slice } from './reducer';
import store from '@/store/store';
import { Inject, Loading, Param } from '@/store/core/injectAction';
import middleware from '@/store/core/middleware';

const { actions: reducer } = slice;
const dispatch = store.dispatch;

export const fetchPage = Inject(async (params: any) => {
  let param =
    (params.pageSize && params.current)
      ? params
      : Object.assign({}, params, { current: 1, pageSize: 10 });
  const data = await Api.fetchPage(param);
  if (data.code === 0 || data.code === 200) {
    const { current, total, pageSize } = data.data;
    /** 出现分页参数有误的情况，需要重新发送请求 */
    if (total / pageSize + 1 <= current) {
      fetchPage({...params, current: current-1, pageSize});
      return;
    }
    dispatch(reducer.savePage(data.data));
  } else {
    message.error("操作失败");
  }
}, 'fetchPage')([Loading, Param])

export const fetchLogin = Inject(async (params: any) => {
  const data = await Api.fetchLogin(params);
  if (data?.retcode === 0 || data?.retcode === 200) {
    dispatch(reducer.saveAccountInfo(data.data.account_info));
  } else {
    message.error("操作失败");
  }
}, 'fetchLogin')([Loading, Param])
