import { Application, Sprite } from "pixi.js";
import { CIRCLE_TEXTURE } from './constants';

interface Options {
    x: number;
    size: number;
}

export default class Circle {
    app: Application;
    options: Options;
    circle: Sprite;
    direction: number;//from 0 to 2*PI
    velocity: number = 3;

    mount(app: Application, options: Options): Circle {
        this.app = app;
        this.options = options;
        this.createCircle();

        return this;
    }

    init(): void {
        this.direction = Math.random() * Math.PI;
        this.initMoving();
    }

    private createCircle(): void {
        const { innerHeight } = window;
        const { x, size } = this.options;
        let y = Math.round(innerHeight * Math.random());
        if ( y + size > innerHeight ) {
            y = (innerHeight - size) * 2;
        }

        this.circle = new Sprite(
            this.app.loader.resources[CIRCLE_TEXTURE].texture
        );
        this.circle.position.set(x, y);
        this.circle.width = size;
        this.circle.height = size;

        this.app.stage.addChild(this.circle);
    }

    private initMoving() {
        
    }
}