import { Application, Container } from "pixi.js";
import Engine from "../engine/Engine";
import SceneInterface from "../engine/models/interfaces/SceneInterface";

export default class BaseScene<Scenes extends string, Assets extends string>
    implements SceneInterface<Scenes , Assets> {
    instance = new Container;
    
    app: Application;

    engine: Engine<Scenes, Assets>;

    constructor() {
        this.instance = new Container;
        this.instance.width = window.innerWidth;
        this.instance.height = window.innerHeight;
    }

    init() {
        this.onInit();
        return this;
    };

    onInit(): void {

    };

    show(): void {
        this.instance.visible = true;
        this.onShow();
    };

    onShow(): void {

    };

    hide(): void {
        this.instance.visible = false;
        this.onHide();
    };

    onHide(): void {

    };

    setApp(app: Application) {
        this.app = app;
        return this;
    }

    setEngine(engine: Engine<Scenes, Assets>) {
        this.engine = engine;
        return this;
    }
}