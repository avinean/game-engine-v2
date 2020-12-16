import { Application } from 'pixi.js';
import WatchableInterface from './models/WatchableInterface';

interface Options {
    test?: any;
}

export default class CollisionWatcher {
    app: Application;
    options: Options;

    mount(app: Application, options: Options): CollisionWatcher {
        this.app = app;
        this.options = options;

        return this;
    }

    watch(containers: WatchableInterface[]): void {

    }
}
