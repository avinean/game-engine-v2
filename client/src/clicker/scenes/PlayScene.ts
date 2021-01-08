import { Container, Sprite, Text, TextStyle } from "pixi.js";
import BaseScene from "../../engine/BaseScene"
import { AssetsEnum } from "../models/enums/AssetsEnum";
import { ScenesEnum } from "../models/enums/ScenesEnum";

export default class PlayScene extends BaseScene<ScenesEnum, AssetsEnum> {
    private els: {
        balance: Text,
        button: Sprite
    } = {
        balance: null,
        button: null
    };

    private data = {
        balance: 0
    }

    onInit() {
        this.createBalance();
        this.createButton();
    }

    createButton() {
        this.els.button = new Sprite(
            this.app.loader.resources[AssetsEnum.Button].texture
        );
        this.els.button.anchor.set(0.5);
        this.els.button.position.set(window.innerWidth / 2, window.innerHeight / 2);
        this.els.button.width = 200;
        this.els.button.height = 200;
        this.els.button.buttonMode = true;
        this.els.button.interactive = true;
        this.els.button.on('click', () => {
            this.balance++;
        });
        this.app.stage.addChild(this.els.button);
    }

    createBalance() {
        const styles = new TextStyle({
            fontSize: 40
        });
        this.els.balance = new Text(this.balanceStr, styles);
        this.els.balance.x = window.innerWidth - this.els.balance.width;
        this.app.stage.addChild(this.els.balance);
        console.log(this);
    }

    balanceUpdated() {
        const { balance } = this.els;
        balance.text = this.balanceStr;
        balance.x = window.innerWidth - balance.width;
    }

    get balanceStr() {
        return `Balance: ${this.data.balance} $`;
    }

    get balance(): number {
        return this.data.balance;
    }

    set balance(balance: number) {
        this.data.balance = balance;
        this.balanceUpdated();
    }
}