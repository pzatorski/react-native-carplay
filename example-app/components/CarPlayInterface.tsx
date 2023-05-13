import { CarPlay, GridTemplate, MapTemplate } from 'react-native-carplay';
import React from 'react';
import Speedometer from './Speedometer';
import { Provider } from 'react-redux';
import { store } from '../store/rootStore';

export default function CarPlayInterface() {
  const template = new MapTemplate({
    component: () => (
      <Provider store={store}>
        <Speedometer />
      </Provider>
    ),
  });

  CarPlay.setRootTemplate(template);

  return null;
}
