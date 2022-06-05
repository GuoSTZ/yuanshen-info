import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import store from './store/store';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import routes from './router';
import './index.less';

global.API_PREFIX = '/capaa';

const App: React.FC<any> = props => {
  const View = useRoutes(routes);
  return (
    <div>
      {View}
    </div>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
