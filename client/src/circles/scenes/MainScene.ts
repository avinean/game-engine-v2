import Circle from "../components/Circle";
import BaseScene from "../../engine/BaseScene";
import { AssetsEnum } from "../models/enums/AssetsEnum";
import { ScenesEnum } from "../models/enums/ScenesEnum";

export default class MainScene extends BaseScene<ScenesEnum, AssetsEnum> {
    private circles: Circle[] = [];

    constructor() {
        super();
    }

    onInit() {
        const count = 20;
        for(let i = 0; i < count; i ++) {
            this.circles.push(new Circle(this.app, {
                x: window.innerWidth / count * i,
                size: window.innerWidth / count
            }));
        }

        this.app.ticker.add(() => {
            this.watchCollision();
        })
    }

    watchCollision(): void {
        this.circles.forEach(c1 => {
            this.circles.forEach(c2 => {
               if (c1 === c2) return;
               if (c1.isCollision(c2)) {
                   console.log('collision');
                   c1.swapVectors(c2);
               }
            });

            c1.move();
        });
    }

}
