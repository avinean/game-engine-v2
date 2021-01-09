import { Container, Sprite, Text, TextStyle } from "pixi.js";
import BaseScene from "../../../engine/BaseScene"
import { AssetsEnum } from "../../models/enums/AssetsEnum";
import { ScenesEnum } from "../../models/enums/ScenesEnum";

export default class MainScene extends BaseScene<ScenesEnum, AssetsEnum> {
    private btnWrapper: Container;
    private startButton: Sprite;
    private btnText: Text;

    onInit() {
        this.createStartButton();
    }

    createStartButton() {
        const width = 200;
        const height = 200;

        this.btnWrapper = new Container;
        this.btnWrapper.width = width;
        this.btnWrapper.height = height;
        this.btnWrapper.position.set(window.innerWidth / 2, window.innerHeight / 2);

        this.startButton = new Sprite(
            this.app.loader.resources[AssetsEnum.Button].texture
        );
        this.startButton.width = width;
        this.startButton.height = height;
        this.startButton.position.set(0, 0);
        this.startButton.anchor.set(0.5);
        this.startButton.buttonMode = true;
        this.startButton.interactive = true
        this.startButton.on('click', () => {
            this.engine.activateScene(ScenesEnum.PlayScene);
        });

        const style = new TextStyle({
            fontSize: 36,
            fill: 0xffffff
        });
        this.btnText = new Text('Start', style);
        this.btnText.anchor.set(0.5);
        this.btnText.x = 0;
        this.btnText.y = 0;

        this.btnWrapper.addChild(this.startButton);
        this.btnWrapper.addChild(this.btnText);
        this.instance.addChild(this.btnWrapper);
    }
}