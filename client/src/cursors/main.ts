import Engine from "../engine/Engine";
import { AssetsEnum } from './models/enums/AssetsEnum';
import { ScenesEnum } from "./models/enums/ScenesEnum";
import MainScene from "./scenes/MainScene";

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
        { name: AssetsEnum.StarPic, url: '/cursors/images/star.png'},
        { name: AssetsEnum.HeartPic, url: '/cursors/images/heart.png'},
        { name: AssetsEnum.DollarPic, url: '/cursors/images/dollar.png'},
        { name: AssetsEnum.TriPic, url: '/cursors/images/tri.png'},
    ],
    scenes: [
        {
            name: ScenesEnum.MainScene,
            scene: MainScene,
            isDefault: true
        }
    ]
});