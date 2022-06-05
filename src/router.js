import React from 'react';
import * as Containers from './container';
import routerJsonObject from '@/schema/router.object.json';
import routerJsonArray from '@/schema/router.array.json';

/** 解析 json 数据 - object */
const renderRouter_object = routes => {
  const { properties } = routes;
  let Routes = [];
  Object.keys(properties).map(key => {
    const router = properties[key];
    const Element = Containers[router['element']];
    /** 此处需要根据route可接受的属性进行扩展，目前仅做了path和element的处理 */
    const newRouter = {
      path: router.path,
      element: <Element />
    }
    if(router.children) {
      newRouter.children = renderRouter_object(router.children);
    }
    Routes.push(newRouter);
  });
  return Routes;
}

/** 解析 json 数据 - array */
const renderRouter_array = routes => {
  const { items } = routes;
  let Routes = [];
  items.map(item => {
    const Element = Containers[item['element']];
    /** 此处需要根据route可接受的属性进行扩展，目前仅做了path和element的处理 */
    const newRouter = {
      path: item.path,
      element: <Element />
    }
    if(item.children) {
      newRouter.children = renderRouter_array(item.children);
    }
    Routes.push(newRouter);
  });
  return Routes;
}

/** 目前支持 array 和 object 两种类型的路由 json 配置数据，后续需要统一 */
const renderRouter = (json, type) => type === "object" ? renderRouter_object(json) : renderRouter_array(json);

// export default renderRouter(routerJsonObject.routes);
export default renderRouter(routerJsonArray.routes, "array");
