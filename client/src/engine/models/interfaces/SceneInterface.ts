import { Application, Container, Sprite } from "pixi.js";
import Engine from "../../Engine";

export default interface SceneInterface<S extends string, A extends string> {
    instance: Container;

    init(): this;

    onInit(): void;

    show(): void;

    onShow(): void;

    hide(): void;

    onHide(): void;

    setApp(app: Application): this;

    setEngine(engine: Engine<S, A>): this;


}