import { Application, Sprite } from "pixi.js";
import { CIRCLE_TEXTURE } from './constants';

interface Options {
    x: number;
    size: number;
}

interface MovingSettings {
    velocity: number;
    angle: number;
    x: number;
    y: number;
}

export default class Circle {
    app: Application;
    options: Options;
    circle: Sprite;
    movingSettings: MovingSettings = {
        x: 0,
        y: 0,
        velocity: 3,
        angle: Math.PI * Math.random()
    };

    mount(app: Application, options: Options): Circle {
        this.app = app;
        this.options = options;
        this.createCircle();

        return this;
    }

    init(): void {
        this.calculateMovingSettings(Math.random() * Math.PI);
        this.initMoving();
    }

    private createCircle(): void {
        const { innerHeight } = window;
        const { x, size } = this.options;
        let y = Math.round(innerHeight * Math.random());
        if ( y + size > innerHeight ) {
            y = (innerHeight - size) / 2;
        }

        this.circle = new Sprite(
            this.app.loader.resources[CIRCLE_TEXTURE].texture
        );
        this.circle.position.set(x + size / 2, y + size / 2);
        this.circle.width = size;
        this.circle.height = size;
        this.circle.anchor.set(.5, .5);

        console.log(this.circle);

        this.app.stage.addChild(this.circle);
    }

    private initMoving() {
        this.app.ticker.add(() => {
            const { x, y } = this.movingSettings;
            this.circle.x += x;
            this.circle.y += y;

            this.checkColission();
        })
    }

    calculateMovingSettings(a: number): void {
        const { fullAngle: angle, pureAngle } = this.normalizeAngle(a);
        const { horizontal, vertical } = this.getSignsByAngle(angle);
        const { velocity } = this.movingSettings;

        let x = Math.sin(pureAngle) * velocity;
        let y = Math.cos(pureAngle) * velocity;

        if (!horizontal)    x = 0 - x;
        if (!vertical)      y = 0 -y;

        this.movingSettings = {
            ...this.movingSettings,
            angle, x, y
        }
    }

    normalizeAngle(angle: number): { fullAngle: number, pureAngle: number} {
        const fullAngle = angle - ( Math.floor( angle / Math.PI ) * Math.PI);
        let pureAngle: number;

        if      (fullAngle < (Math.PI / 4))     pureAngle = fullAngle;
        else if (fullAngle < (Math.PI / 2))     pureAngle = Math.PI * 2 - fullAngle;
        else if (fullAngle < (Math.PI / 4 * 3)) pureAngle = fullAngle - Math.PI * 2;
        else if (fullAngle < Math.PI)           pureAngle = Math.PI - fullAngle;

        return {
            fullAngle,
            pureAngle
        };
    }

    getSignsByAngle(angle: number): { horizontal: boolean; vertical: boolean; } {
        let horizontal: boolean, vertical: boolean;

        horizontal = (angle >= 0) && (angle <= (Math.PI / 2));
        vertical = !((angle >= (Math.PI / 4)) && (angle <= (Math.PI * 3 / 4)));

        return { horizontal, vertical };
    }

    checkColission(): void {
        const { innerHeight, innerWidth } = window;
        const { x: cx, y: cy, width, height } = this.circle;
        const { x, y } = this.movingSettings;
        
        if (
           cx + width / 2 > innerWidth ||
           cx - width / 2 < 0 || 
           cy + height / 2 > innerHeight ||
           cy - height / 2 < 0 
        ) {
            this.movingSettings = {
                ...this.movingSettings,
                x: 0 - x,
                y: 0 - y
            }
        }
    }
}