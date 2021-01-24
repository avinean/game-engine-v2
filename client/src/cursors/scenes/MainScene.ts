import { Sprite } from "pixi.js";
import BaseScene from "../../engine/BaseScene";
import { AssetsEnum } from "../models/enums/AssetsEnum";
import { ScenesEnum } from "../models/enums/ScenesEnum";

export default class MainScene extends BaseScene<ScenesEnum, AssetsEnum> {
    onInit() {
        this.instance.addChild(
            new Sprite(
                this.app.loader.resources[AssetsEnum.StarPic].texture
            )
        )
    }
    
}