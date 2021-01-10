import { Container, Loader, Sprite, Texture } from "pixi.js";
import { AssetsEnum } from "../../models/enums/AssetsEnum";

interface Item {
    price: number;
    texture: Texture;
    instance: Sprite;
    status: boolean;
}

interface State {
    balance: number;
    items: Item[];
}

export default class StuffPanel {
    instance: Container;
    state: State = {
        balance: 0,
        items: [
            {
                price: 25,
                texture: Loader.shared.resources[AssetsEnum.QuaterCent].texture,
                instance: null,
                status: false
            },
            {
                price: 100,
                texture: Loader.shared.resources[AssetsEnum.Dollar].texture,
                instance: null,
                status: false
            },
            {
                price: 10000,
                texture: Loader.shared.resources[AssetsEnum.Hundred].texture,
                instance: null,
                status: false
            },
            {
                price: 1000000,
                texture: Loader.shared.resources[AssetsEnum.Thousend].texture,
                instance: null,
                status: false
            }
        ]
    };

    constructor() {
        this.createContainer();
        this.createItems();
    }

    createContainer() {
        this.instance = new Container;
        this.instance.alpha = 1;

        const bg = new Sprite(Texture.WHITE);
        bg.height = window.innerHeight;
        bg.width = 150;
        bg.tint = 0xEEEEEE;

        this.instance.addChild(bg);
    }

    createItems() {
        this.state.items.forEach(( item, i ) => {
            item.instance = new Sprite(item.texture);
            item.instance.y = i * 100;
            item.instance.width = 110;
            item.instance.height = 90;
            this.instance.addChild(item.instance);
        });
    }

    get balance() {
        return this.state.balance;
    }

    set balance(balance) {
        this.state.balance = balance;
    }
}