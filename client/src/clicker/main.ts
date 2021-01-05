import Engine from "../engine/Engine";
import { AssetsEnum } from "./models/enums/AssetsEnum";
import { ScenesEnum } from "./models/enums/ScenesEnum";
import MainScene from "./scenes/MainScene";

new Engine({
    applicationsConfig: {
        transparent: true,
    },
    normalizeScreen: true,
    responsive: true,
    assets: [
        { name: AssetsEnum.MainBackground, url: '/clicker/images/main.jpg'},
    ],
    background: AssetsEnum.MainBackground,
    scenes: [
        {
            name: ScenesEnum.MainScene,
            scene: MainScene,
            isDefault: true,
        },
    ],
    onInit(app) {
        
    }
});