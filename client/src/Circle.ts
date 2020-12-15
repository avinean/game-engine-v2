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

enum Quaters {
    First = 1,
    Second = 2,
    Third = 3,
    Forth = 4
}

enum Borders {
    Top = 1,
    Right = 2,
    Bottom = 3,
    Left = 4
}

export default class Circle {
    app: Application;
    options: Options;
    circle: Sprite;
    movingSettings: MovingSettings = {
        x: 0,
        y: 0,
        velocity: 1,
        angle: 2 * Math.PI * Math.random()
    };

    mount(app: Application, options: Options): Circle {
        this.app = app;
        this.options = options;
        this.createCircle();

        return this;
    }

    init(): void {
        this.calculateMovingSettings(this.movingSettings.angle);
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

    calculateMovingSettings(angle: number): void {
        const { velocity } = this.movingSettings;

        let x = Math.sin(angle) * velocity;
        let y = -1 * Math.cos(angle) * velocity;

        this.movingSettings = {
            ...this.movingSettings,
            angle, x, y
        }
    }

    checkColission(): void {
        const { PI } = Math;
        let { angle } = this.movingSettings;
        let quater: Quaters = this.quater;
        let border: Borders = this.border;
        
        switch (border) {
            case Borders.Top:
            case Borders.Bottom:
                switch (quater) {
                    case Quaters.First:
                    case Quaters.Second:
                        return this.calculateMovingSettings(PI - angle);
                    case Quaters.Forth:
                    case Quaters.Third:
                        return this.calculateMovingSettings(3 * PI - angle);
                }
            case Borders.Right:
            case Borders.Left:
                return this.calculateMovingSettings(2 * PI - angle);
        }
    }

    get quater(): Quaters {
        const { PI } = Math;
        const { angle } = this.movingSettings;
        if (angle >= 0 && angle <= PI / 2) {
            return Quaters.First;
        }
        else if (angle >= PI / 2 && angle <= PI) {
            return Quaters.Second;
        }
        else if (angle >= PI && angle <= PI * 4 / 3) {
            return Quaters.Third;
        }
        else if (angle >= PI * 4 / 3 && angle <= PI * 2) {
            return Quaters.Forth;
        }
    }

    get border(): Borders {
        const { innerHeight, innerWidth } = window;
        const { x: cx, y: cy, width, height } = this.circle;
                
        if (cx + width / 2 > innerWidth) {
            return Borders.Right
        }
        else if (cx - width / 2 < 0) {
            return Borders.Left
        }
        else if (cy + height / 2 > innerHeight) {
            return Borders.Bottom
        }
        else if (cy - height / 2 < 0) {
            return Borders.Top
        }
    }

}