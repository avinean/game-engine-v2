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

const config = {
    panelWidth: 150,
    itemWidth: 110,
}

const colors = {
    inactive: 0x777777,
    active: 0xffffff
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

    private events: { [itemSelect: string]: Function[] } = {
        itemSelect: []
    };

    constructor() {
        this.createContainer();
        this.createItems();
        console.log(this)
    }

    createContainer() {
        this.instance = new Container;
        this.instance.alpha = 1;

        const bg = new Sprite(Texture.WHITE);
        bg.height = window.innerHeight;
        bg.width = config.panelWidth;
        bg.tint = 0xEEEEEE;

        this.instance.addChild(bg);
    }

    createItems() {
        let y = 10;
        const height = 90;
        this.state.items.forEach( item => {
            item.instance = new Sprite(item.texture);
            item.instance.y = y;
            item.instance.width = config.itemWidth;
            item.instance.height = height;
            item.instance.buttonMode = true;
            item.instance.interactive = true;
            item.instance.on('click', () => {
                if (item.price > this.balance) return;
                this.events.itemSelect.forEach(cb => {
                    cb(item.price);
                })
            });
            this.instance.addChild(item.instance);

            y += height;
        });

        this.balance = this.state.balance;
    }

    updateItems() {
        this.state.items.forEach(item => {
            if (item.price > this.balance) {
                item.instance.tint = colors.inactive;
            } else {
                item.instance.tint = colors.active;
            }
        });
        console.log('updated')
    }

    onItemSelect(cb: Function) {
        this.events.itemSelect.push(cb);
    }

    get balance() {
        return this.state.balance;
    }

    set balance(balance) {
        this.state.balance = balance;
        this.updateItems();
    }
}