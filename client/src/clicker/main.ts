import Engine from "../engine/Engine";
import { AssetsEnum } from "./models/enums/AssetsEnum";
import { ScenesEnum } from "./models/enums/ScenesEnum";
import MainScene from "./scenes/MainScene/MainScene";
import PlayScene from "./scenes/PlayScene/PlayScene";

new Engine({
    applicationsConfig: {
        transparent: true,
        sharedLoader: true,
        sharedTicker: true
        // antialias: true,
        // resolution: 1
    },
    normalizeScreen: true,
    responsive: true,
    assets: [
        { name: AssetsEnum.MainBackground, url: '/clicker/images/main.jpg'},
        { name: AssetsEnum.Button, url: '/clicker/images/button.png'},
        { name: AssetsEnum.Cent, url: '/clicker/images/cent.jpg'},
        { name: AssetsEnum.QuaterCent, url: '/clicker/images/quater-cent.jpg'},
        { name: AssetsEnum.Dollar, url: '/clicker/images/dollar.jpeg'},
        { name: AssetsEnum.Hundred, url: '/clicker/images/hundred.jpg'},
        { name: AssetsEnum.Thousend, url: '/clicker/images/thousend.jpg'},
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