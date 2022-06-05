import { Navigate } from 'react-router-dom';
import getSelectorProps from './prop';
import store from '../store';

const middleware = {
  refreshPage: (action: Function, resetParams?: boolean) => {
    const { querys } = getSelectorProps(store.getState());
    const params = querys(action);
    resetParams ? action({}) : action(params);
  },
  goBack: () => {
    Navigate({to: "/"});
  }
}

export default middleware;