import { Graphics, Sprite } from "pixi.js";
import Circle from "../components/Circle";
import BaseScene from "../engine/BaseScene";
import { AssetsEnum } from "../models/enums/AssetsEnum";
import { ScenesEnum } from "../models/enums/ScenesEnum";

export default class MainScene extends BaseScene<ScenesEnum, AssetsEnum> {
    constructor() {
        super();
    }

    onInit() {
        const count = 10;
        for(let i = 0; i < count; i ++) {
            const circle = (new Circle).mount(this.app, {
                x: window.innerWidth / count * i,
                size: window.innerWidth / count
            }).init();
        }
        // this.app.stage.addChild(circle);
    }

}