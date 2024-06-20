import { View, Text, Button } from 'react-native';
import React, { useEffect } from 'react';
import useCarPlayConnect from '../hooks/useCarPlayConnect';
import { useAppDispatch } from '../hooks/storeHooks';
import { setSpeed } from '../store/speedometerReducer';
import useLocation from '../hooks/useLocation';

export default function Main() {
  const dispatch = useAppDispatch();
  const { connected } = useCarPlayConnect();
  const { location } = useLocation();

  useEffect(() => {
    if (!location || !location?.coords?.speed || location?.coords?.speed < 0) {
      return;
    }

    // Convert m/s to km/h
    dispatch(setSpeed(Math.floor(location.coords.speed * 3.6)));
  }, [location?.coords.speed]);

  return (
    <View>
      <Text>{connected ? 'Connected' : 'Disconnected'}</Text>
      <Text>CarPlay app example</Text>
    </View>
  );
}
