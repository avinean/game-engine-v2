import { Application, Graphics } from 'pixi.js';

interface Options {
    x: number;
    size: number;
}

interface MovingSettings {
    velocity: number;
    angle: number;
    x: number;
    y: number;
    color: number;
}

enum Quarters {
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
    private app: Application;
    private options: Options;
    private circle: Graphics;
    private movingSettings: MovingSettings = {
        x: Math.random() * 2 + 2,
        y: Math.random() * 2 + 2,
        velocity: 1,
        angle: 2 * Math.PI * Math.random(),
        color: this.randomColor
    };

    constructor(app: Application, options: Options) {
        this.app = app;
        this.options = options;
        this.createCircle();
    }

    private createCircle(): void {
        const { innerHeight } = window;
        const { x, size } = this.options;
        let y = Math.round(innerHeight * Math.random());
        if ( y + size > innerHeight ) {
            y = (innerHeight - size) / 2;
        }
        const radius = size / 2;

        this.circle = new Graphics();
        this.circle.beginFill(this.movingSettings.color);
        this.circle.drawCircle(0, 0, radius);
        this.circle.endFill();
        this.circle.x = x + radius;
        this.circle.y = y + radius;

        this.app.stage.addChild(this.circle);
    }

    public move(): void {
        switch (this.border) {
            case Borders.Right:
            case Borders.Left:
                this.movingSettings.x *= -1;
                break;
            case Borders.Top:
            case Borders.Bottom:
                this.movingSettings.y *= -1;
                break;
        }

        const { x, y } = this.movingSettings;

        this.circle.x += x;
        this.circle.y += y;
    }

    isCollision(circle: Circle): boolean {
        const { x: x1, y: y1, width: width1 } = circle.circle;
        const { x: x2, y: y2, width: width2 } = this.circle;

        const distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        const radiusSum = circle.options.size / 2 + this.options.size / 2;

        return distance <= radiusSum;
    }

    swapVectors(circle: Circle): void {
        const { x: x1, y: y1 } = circle.settings;
        const { x: x2, y: y2 } = this.movingSettings;

        circle.settings = {
            x: x2,
            y: y2
        };

        this.settings = {
            x: x1,
            y: y1
        };
    }

    private get randomColor(): number {
        return Math.random() * 0xFFFFFF;
    }

    private get border(): Borders {
        const { innerHeight, innerWidth } = window;
        const { x: cx, y: cy, width, height } = this.circle;

        if (cx + width / 2 > innerWidth)        return Borders.Right;
        else if (cx - width / 2 < 0)            return Borders.Left;
        else if (cy + height / 2 > innerHeight) return Borders.Bottom;
        else if (cy - height / 2 < 0)           return Borders.Top;
    }

    public get coordinates() {
        const { x, y } = this.movingSettings;
        return { x, y };
    }

    public get settings(): Partial<MovingSettings> {
        return this.movingSettings;
    }

    public set settings(settings: Partial<MovingSettings>) {
        this.movingSettings = {
            ...this.movingSettings,
            ...settings,
        };
    }
}
