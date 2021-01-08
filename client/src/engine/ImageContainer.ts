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

        const imageRatio = w2 / h2;
        const hRatio = h1 / h2;
        const wRatio = w1 / w2;

        if (wRatio < hRatio) {
            console.log('less', h1 * imageRatio, h1)
            this.width = h1 * imageRatio;
            this.height = h1;
        }
        else {
            console.log('more', w1, w1 / imageRatio)
            this.width = w1;
            this.height = w1 / imageRatio;
        }
        console.log(this)
    }

}