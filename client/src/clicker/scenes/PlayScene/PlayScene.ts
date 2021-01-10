import { Container, Sprite, Text, TextStyle, Texture } from "pixi.js";
import BaseScene from "../../../engine/BaseScene"
import StuffPanel from "../../components/StaffPanel/StaffPanell";
import { AssetsEnum } from "../../models/enums/AssetsEnum";
import { ScenesEnum } from "../../models/enums/ScenesEnum";

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

    private main: Container;
    private sideBar: StuffPanel;

    onInit() {
        this.createSideBar();
        this.createMain();
        this.createBalance();
        this.createButton();
        console.log(this.main);
    }

    createButton() {
        this.els.button = new Sprite(
            this.app.loader.resources[AssetsEnum.Button].texture
        );
        this.els.button.anchor.set(0.5);
        this.els.button.position.set(this.main.width / 2, this.main.height / 2);
        this.els.button.width = 200;
        this.els.button.height = 200;
        this.els.button.buttonMode = true;
        this.els.button.interactive = true;
        this.els.button.on('click', () => {
            this.balance++;
        });
        this.main.addChild(this.els.button);
    }

    createBalance() {
        const styles = new TextStyle({
            fontSize: 40
        });
        this.els.balance = new Text(this.balanceStr, styles);
        this.els.balance.x = window.innerWidth - this.sideBar.instance.width - this.els.balance.width;
        this.main.addChild(this.els.balance);
    }

    balanceUpdated() {
        this.els.balance.text = this.balanceStr;
        this.els.balance.x = window.innerWidth - this.sideBar.instance.width - this.els.balance.width;
        // TODO: find some information about best practices
        // to avoid such horror
        console.log(this.main.width, this.els.balance.width, this.els.balance.x)
    }

    createMain() {
        this.main = new Container;
        this.main.y = 0;
        this.main.x = this.sideBar.instance.width;

        const bg = new Sprite(Texture.WHITE);
        bg.width = window.innerWidth - this.sideBar.instance.width;
        bg.height = window.innerHeight;
        bg.tint = 0xCCCCCC;

        this.main.addChild(bg);
        this.instance.addChild(this.main);
    }

    createSideBar() {
        this.sideBar = new StuffPanel;
        this.instance.addChild(this.sideBar.instance);
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