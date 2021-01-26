import { Sprite } from "pixi.js";
import BaseScene from "../../engine/BaseScene";
import { Star } from "../components/Star";
import { AssetsEnum } from "../models/enums/AssetsEnum";
import { ScenesEnum } from "../models/enums/ScenesEnum";

export default class MainScene extends BaseScene<ScenesEnum, AssetsEnum> {
    currentCoords = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };

    stars: Star[] = [];

    onMouseMove = this.onMouseMoveUnbinded.bind(this);

    onInit() {
        for(let i = 0; i < 100; i ++) {
            setTimeout(() => {
                const star = new Star(this.currentCoords);
                this.stars.push(star);
                this.instance.addChild(star.instance);
            }, Math.random() * 2000);
        }

        window.addEventListener('mousemove', this.onMouseMove);

        this.createPane();
    }

    onMouseMoveUnbinded({ pageX, pageY }: MouseEvent) {
        this.currentCoords.x = pageX;
        this.currentCoords.y = pageY;
    }

    createPane() {
        const textures = [
            this.app.loader.resources[AssetsEnum.StarPic].texture,
            this.app.loader.resources[AssetsEnum.HeartPic].texture,
            this.app.loader.resources[AssetsEnum.DollarPic].texture
        ];

        const size = 50;
        const margin = 20;

        textures.forEach((texture, i) => {
            const btn = new Sprite(texture);
            btn.height = size;
            btn.width = size;
            
            btn.position.set(margin, margin + size * i);
            btn.anchor.set(0);
            btn.interactive = true;
            btn.buttonMode = true;
            btn.on('click', () => {
                this.stars.forEach(star => {
                    star.updateTexture(texture);
                });
            });

            this.instance.addChild(btn);
        });
    }
    
}