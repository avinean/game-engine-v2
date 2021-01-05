import { Sprite } from "pixi.js";
import BaseScene from "../../engine/BaseScene"
import { AssetsEnum } from "../models/enums/AssetsEnum";
import { ScenesEnum } from "../models/enums/ScenesEnum";

export default class MainScene extends BaseScene<ScenesEnum, AssetsEnum> {
    background: Sprite;

    onInit() {
        // this.background = new Sprite(
        //     this.app.loader.resources[AssetsEnum.MainBackground].texture
        // );
        // this.background.x = 0;
        // this.background.y = 0;
        // this.background.anchor.set(0.5);
        // this.background.height = window.innerHeight;
        // this.app.stage.addChild(this.background);
    }
}