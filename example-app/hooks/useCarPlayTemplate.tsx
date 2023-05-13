import { useEffect } from 'react';
import { CarPlay, MapTemplate } from 'react-native-carplay';
import { Provider } from 'react-redux';
import Speedometer from '../components/Speedometer';
import { store } from '../store/rootStore';

export default function useCarPlayTemplate() {
  useEffect(() => {
    const template = new MapTemplate({
      component: () => (
        <Provider store={store}>
          <Speedometer />
        </Provider>
      ),
    });

    CarPlay.setRootTemplate(template);
  }, []);
}
