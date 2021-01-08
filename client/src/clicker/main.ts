import Engine from "../engine/Engine";
import { AssetsEnum } from "./models/enums/AssetsEnum";
import { ScenesEnum } from "./models/enums/ScenesEnum";
import MainScene from "./scenes/MainScene";
import PlayScene from "./scenes/PlayScene";

new Engine({
    applicationsConfig: {
        transparent: true,
        // antialias: true,
        // resolution: 1
    },
    normalizeScreen: true,
    responsive: true,
    assets: [
        { name: AssetsEnum.MainBackground, url: '/clicker/images/main.jpg'},
        { name: AssetsEnum.Button, url: '/clicker/images/button.png'},
    ],
    background: AssetsEnum.MainBackground,
    scenes: [
        {
            name: ScenesEnum.MainScene,
            scene: MainScene,
            isDefault: true,
        },
        {
            name: ScenesEnum.PlayScene,
            scene: PlayScene,
        },
    ],
    onInit(app) {
        
    }
});