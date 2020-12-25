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
        x: Math.random() * 10 + 2,
        y: Math.random() * 10 + 2,
        velocity: 1,
        angle: 2 * Math.PI * Math.random(),
        color: this.randomColor
    };

    public mount(app: Application, options: Options): Circle {
        this.app = app;
        this.options = options;
        this.createCircle();

        return this;
    }

    public init(): Circle {
        // this.calculateMovingSettings(this.movingSettings.angle);
        this.initMoving();

        return this;
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

    private initMoving() {
        this.app.ticker.add(() => {

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

            

            // this.circle.fill.color = this.movingSettings.color;

            // this.checkCollision();
        })
    }

    private calculateMovingSettings(angle: number): void {
        const { velocity } = this.movingSettings;

        const x = Math.sin(angle) * velocity;
        const y = -1 * Math.cos(angle) * velocity;
        const color = this.randomColor;

        this.movingSettings = {
            ...this.movingSettings,
            angle, x, y, color
        }
    }

    private checkCollision(): void {
        const { PI } = Math;
        const { angle } = this.movingSettings;
        const quarter: Quarters = this.quarter;
        const border: Borders = this.border;

        switch (border) {
            case Borders.Top:
            case Borders.Bottom:
                switch (quarter) {
                    case Quarters.First:
                    case Quarters.Second:
                        return this.calculateMovingSettings(PI - angle);
                    case Quarters.Forth:
                    case Quarters.Third:
                        return this.calculateMovingSettings(3 * PI - angle);
                }
                return;
            case Borders.Right:
            case Borders.Left:
                return this.calculateMovingSettings(2 * PI - angle);
        }
    }

    onCollision(angle: number) {
    }

    private get randomColor(): number {
        return Math.random() * 0xFFFFFF;
    }

    private get quarter(): Quarters {
        const { PI } = Math;
        const { angle } = this.movingSettings;
        if (angle >= 0 && angle <= PI / 2) {
            return Quarters.First;
        }
        else if (angle >= PI / 2 && angle <= PI) {
            return Quarters.Second;
        }
        else if (angle >= PI && angle <= PI * 4 / 3) {
            return Quarters.Third;
        }
        else if (angle >= PI * 4 / 3 && angle <= PI * 2) {
            return Quarters.Forth;
        }
    }

    private get border(): Borders {
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

    public get coordinates() {
        const { x, y } = this.movingSettings;
        return { x, y };
    }
}
