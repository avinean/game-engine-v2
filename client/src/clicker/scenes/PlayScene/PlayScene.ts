import { Container, Sprite, Text, TextStyle, Texture } from "pixi.js";
import BaseScene from "../../../engine/BaseScene"
import StuffPanel from "../../components/StaffPanel/StaffPanell";
import { AssetsEnum } from "../../models/enums/AssetsEnum";
import { ScenesEnum } from "../../models/enums/ScenesEnum";

export default class PlayScene extends BaseScene<ScenesEnum, AssetsEnum> {
    private els: {
        balance: Text,
        button: Container,
        salary: Text
    } = {
        balance: null,
        button: null,
        salary: null
    };

    private data = {
        balance: 0,
        salary: 1
    }

    private main: Container;
    private sideBar: StuffPanel;

    onInit() {
        this.createSideBar();
        this.createMain();
        this.createBalance();
        this.createButton();
        this.createSalary();
        console.log(this.main);
    }

    createButton() {
        this.els.button = new Container();
        this.els.button.position.set(this.main.width / 2, this.main.height / 2);
        this.els.button.buttonMode = true;
        this.els.button.interactive = true;
        this.els.button.on('click', () => {
            this.balance = this.balance + this.salary;
        });

        const btn = new Sprite(
            this.app.loader.resources[AssetsEnum.Button].texture
        );
        btn.width = 200;
        btn.height = 200;
        btn.anchor.set(0.5);
        this.els.button.addChild(btn);

        this.main.addChild(this.els.button);
    }

    createSalary() {
        const styles = new TextStyle({
            fontSize: 40
        });
        this.els.salary = new Text(this.salaryStr, styles);
        this.els.salary.anchor.set(0.5);
        this.els.button.addChild(this.els.salary);
    }
    
    salaryUpdated() {
        this.els.salary.text = this.salaryStr;
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
        this.sideBar.balance = this.balance;
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
        this.sideBar.onItemSelect((price: number) => {
            this.balance = this.balance - price;
            this.salary = this.salary + price;
            this.sideBar.balance = this.balance;
        });
        this.instance.addChild(this.sideBar.instance);
    }

    get balanceStr() {
        return `Balance: ${this.data.balance / 100} $`;
    }

    get balance(): number {
        return this.data.balance;
    }

    set balance(balance: number) {
        this.data.balance = balance;
        this.balanceUpdated();
    }

    get salaryStr() {
        if (this.data.salary > 100000) {
            const salary = Math.floor(this.data.salary / 100000);
            return `${salary}K $`;
        }
        return `${this.data.salary / 100} $`;
    }

    get salary(): number {
        return this.data.salary;
    }

    set salary(salary: number) {
        this.data.salary = salary;
        this.salaryUpdated();
    }
}