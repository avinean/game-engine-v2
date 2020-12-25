import Engine from "../Engine";
import ApplicationConfig from "./ApplicationConfig";
import SceneConfig from "./SceneConfig";

export default interface ApplicationOptions<S extends string, A extends string> {
    applicationsConfig?: ApplicationConfig;
    scenes?: SceneConfig<S, A>[];
    normalizeScreen?: boolean;
    assets?: [A, string][];
    onInit?: (engine: Engine<S, A>) => void;
}