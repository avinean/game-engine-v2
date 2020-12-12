"use strict";

import {
    Application, 
    Sprite, 
    Texture,
    Text, TextStyle
} from 'pixi.js';
import { CIRCLE_TEXTURE } from './constants';
import Circle from './Circle';

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
const app: Application = new Application({
    transparent: true
});
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

app.loader
.add(CIRCLE_TEXTURE, '../src/assets/images/circle.png')
.load(() => {
    const count = 10;
    const size = window.innerWidth / count;
    for(let i = 0; i < count; i++) {
        new Circle()
            .mount(
                app,
                {
                    size,
                    x: size * i
                }
            )
            .init();
    }
});


