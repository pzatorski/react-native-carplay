import { useEffect, useState } from 'react';
import { CarPlay } from 'react-native-carplay';

export default function useCarPlayConnect() {
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    function onConnect() {
      setConnected(true);
    }

    function onDisconnect() {
      setConnected(false);
    }

    CarPlay.registerOnConnect(onConnect);
    CarPlay.registerOnDisconnect(onDisconnect);

    return () => {
      CarPlay.unregisterOnConnect(onConnect);
      CarPlay.unregisterOnDisconnect(onDisconnect);
    };
  });

  return {
    connected,
  };
}
