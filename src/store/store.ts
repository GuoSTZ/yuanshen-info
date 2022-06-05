import { configureStore, combineReducers, createSlice } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import fetchingSlice, {namespace as fetching_namespace} from './fetching';
import { slice, namespace } from '@/reducer';

/** 默认reducer配置 */
const appReducer = {};
const app_namespace = "appReducer";
const appSlice = createSlice({
  name: app_namespace,
  initialState: appReducer,
  reducers: {},
})

const store: any = configureStore({
  reducer: {
    [app_namespace]: appSlice.reducer,
    [fetching_namespace]: fetchingSlice.reducer,
    [namespace]: slice.reducer
  },
  // 中间件配置
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({}).concat(logger)
})

// 注册reducer
// store.asyncReducers = {};
// store.injectReducer = (namespace: string, asyncReducer: any) => {
//   store.asyncReducers[namespace] = asyncReducer;
//   store.replaceReducer(
//     combineReducers({
//       [app_namespace]: appSlice.reducer,
//       [fetching_namespace]: fetchingSlice.reducer,
//       ...store.asyncReducers,
//     })
//   );
// };

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;