import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [_errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      Location.watchPositionAsync(
        {
          distanceInterval: 0.1,
        },
        location => setLocation(location),
      );
    })();
  }, []);

  return {
    location,
  };
}
