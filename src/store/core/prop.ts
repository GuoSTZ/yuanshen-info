import { createSelector } from "@reduxjs/toolkit";

/** Selector - fetchingReducer */
export const fetchingReducerSelector = (state: any) => state.fetchingReducer;

/** Selector - fetching */
export const fetchingSelector: any = createSelector(
  fetchingReducerSelector,
  (selector: any) => selector.fetching
);

/** Selector - params */
export const paramsSelector: any = createSelector(
  fetchingReducerSelector,
  (selector: any) => selector.params
);

export default ((state: any) => {
  return {
    /** 获取页面actions请求状态 true or false */
    spins: (type: Function) => {
      return createSelector(fetchingSelector, (fetching: any) => {
        return fetching[type.toString()];
      })(state);
    },
    /** 获取页面actions请求参数 */
    querys: (type: Function) => {
      return createSelector(paramsSelector, (params: any) => {
        return params[type.toString()] || {};
      })(state);
    }
  }
})