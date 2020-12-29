import Engine from "../engine/Engine";
import { AssetsEnum } from "./models/enums/AssetsEnum";
import { ScenesEnum } from "./models/enums/ScenesEnum";
import MainScene from "./scenes/MainScene";

new Engine({
    applicationsConfig: {
        transparent: true,
    },
    normalizeScreen: true,
    assets: [
        { name: AssetsEnum.MainBackground, url: '../../src/clicker/assets/images/main.jpg'},
    ],
    scenes: [
        {
            name: ScenesEnum.MainScene,
            scene: MainScene,
            isDefault: true,
        },
    ],
});