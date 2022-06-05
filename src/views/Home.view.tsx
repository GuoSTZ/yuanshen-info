import React, { useEffect } from 'react';
import usePubSub from '@/hooks/usePubSub';
import { HomeViewEventTypes as EventTypes } from '@/constants/event_type';

export interface HomeViewProps {
  actions: any;
}

export default (props: HomeViewProps) => {
  const { actions } = props;
  /** 统一处理actions请求 */
  const handleActions = (message: any, values: any) => {
    switch (message) {
      case EventTypes.Login:
        actions.fetchLogin(values);
        break;
      default:
        break;
    }
  }
  const { subscribe, unSubscribe, publish } = usePubSub(EventTypes, handleActions);

  useEffect(() => {
    subscribe();
    publish(EventTypes.Login, {
      account: "18042170901",
      geetest_challenge: "a05b83dd8a5658f82e9dfa17aa0db32f",
      geetest_seccode: "ebc3436cc2d4869ee2000ac226a139af|jordan",
      geetest_validate: "ebc3436cc2d4869ee2000ac226a139af",
      is_bh2: false,
      is_crypto: true,
      mmt_key: "wslenqAREjkodDPxryxgFrrbf6fPuGju",
      password: "q9SYhf8M/hl9MyJXT5C7z+/tmorMfi2F8TvH+AIRorkETLgSdUTdNeJHsA1XEZEJooh7uophBpsSCvIEzPdepPaWkYGhJXh5CN8ZVxoKclD2PN/6iZ5v8DWWGj/0vHuqTbtr1+SBYQjIGFQRslTTOqokItZ8IZT52H9KNMLumEs=",
      token_type: 6
    });
    return () => {
      unSubscribe();
    }
  }, [])

  return (
    <div>HomeView</div>
  )
}