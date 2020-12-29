import { Container, Sprite } from "pixi.js";
import Engine from "../engine/Engine";
import { AssetsEnum } from "./models/enums/AssetsEnum";
import { ScenesEnum } from "./models/enums/ScenesEnum";
import MainScene from "./scenes/MainScene";

new Engine<ScenesEnum, AssetsEnum>({
    applicationsConfig: {
        transparent: true,
    },
    scenes: [
        {
            name: ScenesEnum.MainScene,
            scene: MainScene,
            isDefault: true
        }
    ],
    normalizeScreen: true,
    assets: [
        { name: AssetsEnum.MainBG, url: '../src/assets/images/main.jpg'}
    ],
    onInit(engine) {
    }
});

