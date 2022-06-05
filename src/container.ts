import store from "./store/store";
import { namespace } from './reducer';
import * as Action from './actions';
import HomeView from './views/Home.view';
import getSelectorProps from "./store/core/prop";

/** 属性注入 */
const injectProps = (Comp: React.FC<any>) => {
  return () => Comp({
    actions: Action,
    ...getSelectorProps(store.getState()),
  });
}

export const HomeContainer = injectProps(HomeView);
