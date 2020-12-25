import { Container } from "pixi.js";
import SceneInterface from "./interfaces/SceneInterface";

export default interface SceneConfig<S extends string, A extends string> {
    name: S;
    scene: { new(): SceneInterface<S, A> };
    instance?: Container;
    isDefault?: boolean;
    isMounted?: boolean;
}