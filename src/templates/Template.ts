import { EmitterSubscription, Image } from 'react-native';
import { CarPlay } from '../CarPlay';
import { BarButton } from '../interfaces/BarButton';

const traverse = require('traverse'); // tslint:disable-line no-var-requires
// const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource'); // tslint:disable-line no-var-requires

export interface BaseEvent {
  /**
   * Template id that fired the event
   */
  templateId: string;
}

interface BarButtonEvent extends BaseEvent {
  id: string;
}

export interface TemplateConfig {
  /**
   * Give the template your own ID. Must be unique.
   */
  id?: string;
  /**
   * An array of bar buttons to display on the leading side of the navigation bar.
   *
   * The navigation bar displays up to two buttons in the leading space. When including more than two buttons in the array, the system displays only the first two buttons.
   */
  leadingNavigationBarButtons?: BarButton[];
  /**
   * An array of bar buttons to display on the trailing side of the navigation bar.
   *
   * The navigation bar displays up to two buttons in the trailing space. When including more than two buttons in the array, the system displays only the first two buttons.
   */
  trailingNavigationBarButtons?: BarButton[];
  /**
   * UITabBarSystemItem
   */
  tabSystemItem?: number;
  /**
   * Name of system image for tab
   */
  tabSystemImg?: string;
  /**
   * Name of system image for tab
   */
  tabImage?: null;
  /**
   * Fired before template appears
   * @param e Event
   */
  onWillAppear?(e: BaseEvent): void;
  /**
   * Fired before template disappears
   * @param e Event
   */
  onWillDisappear?(e: BaseEvent): void;
  /**
   * Fired after template appears
   * @param e Event
   */
  onDidAppear?(e: BaseEvent): void;
  /**
   * Fired after template disappears
   * @param e Event
   */
  onDidDisappear?(e: BaseEvent): void;

  /**
   * Fired when bar button is pressed
   * @param e Event
   */
  onBarButtonPressed?(e: BarButtonEvent): void;

  /**
   * Fired when popToRootTemplate finished
   */
  onPoppedToRoot?(e: BaseEvent): void;
}

export class Template<P> {
  public get type(): string {
    return 'unset';
  }
  public id: string;
  public listeners: EmitterSubscription[] = [];

  public get eventMap() {
    return {};
  }

  onDisconnectCallback = () => this.destroy();

  constructor(public config: TemplateConfig & P) {
    if (config.id) {
      this.id = config.id;
    }

    if (!this.id) {
      this.id = `${this.type}-${Date.now()}-${Math.round(Math.random() * Number.MAX_SAFE_INTEGER)}`;
      if (__DEV__) {
        console.warn(`auto assigning id ${this.id} for template ${this.type}`);
      }
    }

    const eventMap = {
      barButtonPressed: 'onBarButtonPressed',
      didAppear: 'onDidAppear',
      didDisappear: 'onDidDisappear',
      willAppear: 'onWillAppear',
      willDisappear: 'onWillDisappear',
      poppedToRoot: 'onPoppedToRoot',
      ...(this.eventMap || {}),
    };

    Object.entries(eventMap).forEach(([eventName, callbackName]) => {
      const listener = CarPlay.emitter.addListener(eventName, e => {
        if (config[callbackName] && e.templateId === this.id) {
          config[callbackName](e);
        }
      });
      this.listeners.push(listener);
    });

    if (this.type !== 'map') {
      CarPlay.bridge.createTemplate(this.id, this.parseConfig({ type: this.type, ...config }));
    }

    CarPlay.registerOnDisconnect(this.onDisconnectCallback);
  }

  public parseConfig(config: any) {
    const result = traverse(config).map(function node(x) {
      if (String(this.key).match(/[Ii]mage$/)) {
        this.update(Image.resolveAssetSource(x));
      }
    });
    if (config.onBackButtonPressed) {
      result.isBackButtonCustomized = true;
    }
    return JSON.parse(JSON.stringify(result));
  }

  public destroy() {
    CarPlay.unregisterOnDisconnect(this.onDisconnectCallback);
    this.listeners.forEach(listener => listener.remove());
  }
}
