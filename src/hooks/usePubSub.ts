const usePubSub = (EventTypes: any, handleActions: any) => {
  const PubSub = (window as any)?.PubSub;

  /** 事件订阅 */
  const subscribe = () => {
    Object.keys(EventTypes).forEach((type: string) => {
      PubSub?.subscribe?.(EventTypes[type], handleActions);
    })
  }

  /** 取消事件订阅 */
  const unSubscribe = () => {
    Object.keys(EventTypes).forEach((type: string) => {
      PubSub?.unsubscribe?.(EventTypes[type], handleActions);
    })
  }

  /**
   * 事件发布
   * @param type 事件类型
   * @param values 传值
   */
  const publish = (type: string, values?: any) => {
    PubSub?.publish?.(type, values);
  }

  return {
    subscribe, 
    unSubscribe, 
    publish
  };
}

export default usePubSub;