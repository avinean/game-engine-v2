import Engine from "../engine/Engine";
import { AssetsEnum } from './models/enums/AssetsEnum';

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
    ],
    scenes: []
});