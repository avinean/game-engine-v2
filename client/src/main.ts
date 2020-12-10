"use strict";

import {Application, utils, Sprite, Rectangle, BaseTexture, Texture} from 'pixi.js';

const styles = `
<style>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
</style>
`;
document.body.innerHTML += styles;
const app: Application = new Application();
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

// app.loader
//     .add("../src/assets/images/main.jpg")
//     .load(() => {
//         const testBG = new Sprite(
//             app.loader.resources["../src/assets/images/main.jpg"].texture
//         );
//
//
//         app.stage.addChild(testBG);
//     });
//
// app.loader.onProgress.once((loader, resource) => {
//     // resources loading
//     console.log(loader, resource)
//     console.log("loading: " + resource.url);
//     console.log("progress: " + loader.progress + "%");
//     console.log("loading: " + resource.name);
// });
//



// const TILE_SET = 'TILE_SET';

// app.loader
// .add(TILE_SET, '../src/assets/images/tileset.png')
// .load(function setup(loader, resources) {
//     renderRocket();
//     renderStar();
// });

// function renderRocket() {
//     const texture = new Texture(
//         app.loader.resources[TILE_SET].texture.baseTexture,
//         new Rectangle(96,64,32,32)
//     );

//     const  rocket = new Sprite(texture);
//     rocket.x = 32;
//     rocket.y = 32;

//     app.stage.addChild(rocket);
// }

// function renderStar() {
//     const texture = new Texture(
//         app.loader.resources[TILE_SET].texture.baseTexture,
//         new Rectangle(0,128,32,32)
//     );

//     const  star = new Sprite(texture);
//     star.x = 32;
//     star.y = 96;

//     app.stage.addChild(star);
// }

const FRUITS_IMAGES = 'FRUITS_IMAGES';

app.loader
.add(FRUITS_IMAGES, '../src/assets/images/fruits.json')
.load(() => {
    Object
    .values(app.loader.resources[FRUITS_IMAGES].textures)
    .forEach((texture: Texture, i) => {
        console.log(texture);
        const sprite = new Sprite(texture);
        sprite.x = i * 128;
        sprite.y = i * 128;

        app.stage.addChild(sprite);
    })
});