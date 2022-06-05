import store from '@/store/store';
import fetchingSlice from '@/store/fetching';

const dispatch = store.dispatch;
const namespace = "@@Wrap";
const { fetchReq, fetchRes, fetchParams } = fetchingSlice.actions;

/** 注入loading状态 */
export const injectLoading = (actions: any, namespace: string, dispatch: any) => {
  const newAction: any = {};
  Object.keys(actions).map((key: string, index: number) => {
    const type = `${namespace}/${key}`;
    newAction[key] = async (...args: any) => {
      dispatch(fetchReq({ type, payload: true }));
      await actions[key](...args);
      dispatch(fetchRes({ type, payload: false }));
    }
    newAction[key].prototype.constructor.toString = () => type;
  })
  return newAction;
}

/** 注入param参数 */
const injectParam = (actions: any, namespace: string, dispatch: any) => {
  const newAction: any = {};
  Object.keys(actions).map((key: string) => {
    const type = `${namespace}/${key}`;
    // 由于目前仅需对列表请求接口做参数保留处理，故这里暂时写死，后续需要考虑如何动态处理
    if (key === 'fetchPage') {
      newAction[key] = async (...args: any) => {
        /** args的第一个值为传参值，其他不需要记录 */
        dispatch(fetchParams({ type, payload: args[0] }));
        await actions[key](...args);
      }
    } else {
      newAction[key] = actions[key];
    }
    newAction[key].prototype.constructor.toString = () => type;
  })
  return newAction;
}

/** 整合处理 */
const injectAction = (actions: any, namespace: string, dispatch: any) => {
  let _actions = actions;
  _actions = injectLoading(_actions, namespace, dispatch);
  _actions = injectParam(_actions, namespace, dispatch);
  return _actions;
}

export default injectAction;

/** action 记录loading状态 */
export const Loading = (action: Function, key: string) => {
  const type = `${namespace}/${key}`;
  const newAction = async (...args: any) => {
    dispatch(fetchReq({ type, payload: true }));
    await action(...args);
    dispatch(fetchRes({ type, payload: false }));
  }
  newAction.prototype.constructor.toString = () => type;
  return newAction;
}

/** action 记录传参 */
export const Param = (action: Function, key: string) => {
  const type = `${namespace}/${key}`;
  const newAction = async (...args: any) => {
    /** args的第一个值为传参值，其他不需要记录 */
    dispatch(fetchParams({ type, payload: args[0] }));
    await action(...args);
  }
  newAction.prototype.constructor.toString = () => type;
  return newAction;
}

/** 包裹 action 作处理 */
export const Inject = (func: Function, key: string) => {
  let newFunc = func;
  return (decorators: Function[] = []) => {
    decorators.map((decorator: Function) => {
      newFunc = decorator(newFunc, key)
    })
    return newFunc;
  }
}
