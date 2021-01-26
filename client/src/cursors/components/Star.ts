import { Loader, Sprite, Texture, Ticker } from "pixi.js";
import { AssetsEnum } from "../models/enums/AssetsEnum";

interface Coords {
    x: number;
    y: number;
}

export class Star {
    instance: Sprite;
    radius = 50;
    coords: Coords = {
        x: 0,
        y: 0
    };
    destCoords: Coords = {
        x: 0,
        y: 0
    };

    constructor(coords: Coords) {
        this.coords = coords;
        this.createStar();
        this.updateState();
        Ticker.shared.add(() => {
            this.run();
        });
    }

    createStar() {
        this.instance = new Sprite(
            Loader.shared.resources[AssetsEnum.StarPic].texture
        );
        const size = Math.random() * 20;
        const star = this.instance
        star.width = size;
        star.height = size;
        star.anchor.set(0.5);
        star.position.set(this.coords.x, this.coords.y);
    }

    run() {
        this.instance.alpha = this.instance.alpha - ( 1 / this.radius );
        this.instance.x = this.instance.x + ( this.destCoords.x / this.radius );
        this.instance.y = this.instance.y + ( this.destCoords.y / this.radius ); 
        if (this.instance.alpha <= 0) {
            this.updateState();
        }
    }

    updateState() {
        const angle = Math.random() * Math.PI * 2;

        this.destCoords = {
            x: this.radius * Math.cos(angle),
            y: this.radius * Math.sin(angle)
        }
        this.instance.alpha = 1;
        this.instance.position.set(this.coords.x, this.coords.y);
    }

    updateTexture(texture: Texture) {
        this.instance.texture = texture;
    }
}