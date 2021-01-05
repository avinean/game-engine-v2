import { Application, Container, Sprite, Texture } from "pixi.js";
import resizer from './Resizer';

export default class ImageContainer extends Sprite {
    constructor(texture: Texture) {
        super(texture);
        resizer.add(e => {
            this.handleResize();
        });
    }

    private handleResize() {
        if (!this.parent) return;
        const { width: w1, height: h1 } = this.parent;
        const { width: w2, height: h2} = this.texture.baseTexture;

        const hRatio = h1 / h2;
        const wRatio = w1 / w2;

        console.log(this.parent)
        console.log(this.texture.baseTexture);
        console.log(hRatio);
        console.log(wRatio);
        if (wRatio > hRatio) {
            console.log('more', w1, h2 / wRatio);
            this.width = w1;
            this.height = h2 * wRatio;
        }
        else {
            console.log('less', w2 / hRatio, h1);
            this.width = w2 * hRatio;
            this.height = h1;
        }
    }

}