import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store/store';

export const namespace = "database"; 
const PAGE = 1;
const SIZE = 10;
/** 初始值 */
export const initialState = {
  value: 0,
  items: [],
  page: {
    current: PAGE,
    pageSize: SIZE,
    total: 0
  },
  item: {},
  accountInfo: {}
};

/**
 * 内部使用的是immer，并不是直接修改了state的值,
 * 也可以通过返回值的方式进行更新 @example return {...state, xx: yy}
 */
export const reducers = {
  savePage: (state: RootState, action: PayloadAction<any>) => {
    state.items = action.payload.items;
    state.page = {
      current: action.payload.current,
      pageSize: action.payload.pageSize,
      total: action.payload.total
    }
  },
  saveItem: (state: RootState, action: PayloadAction<any>) => {
    state.item = action.payload;
  },
  saveAccountInfo: (state: RootState, action: PayloadAction<any>) => {
    state.accountInfo = action.payload;
  },
}

/** 创建分片 */
export const slice = createSlice({
  name: namespace,
  initialState,
  reducers: reducers,
})

/** 测试方案 */
// export const saveValue= (params: any) => ({value: params});