import { Application, Container, Loader, Sprite } from 'pixi.js';
import { AssetsEnum } from '../models/enums/AssetsEnum';
import ApplicationOptions from './models/ApplicationOptions';
import SceneInterface from './models/interfaces/SceneInterface';
import SceneConfig from './models/SceneConfig';

export default class Engine<S extends string, A extends string> {
    app: Application;
    options: ApplicationOptions<S, A>;
    scenes: Record<S, SceneConfig<S, A>> = {} as Record<S, SceneConfig<S, A>>;

    constructor(options: ApplicationOptions<S, A> = { scenes: [], assets: [] }) {
        this.options = options;
        this.init();
    }

    private init(): void {
        const { applicationsConfig, normalizeScreen } = this.options;
        this.app = new Application(applicationsConfig);
        this.app.renderer.view.style.position = "absolute";
        this.app.renderer.view.style.display = "block";
        this.app.renderer.resize(window.innerWidth, window.innerHeight);

        if (normalizeScreen) this.normalizeScreen();

        document.body.appendChild(this.app.view);

        this.options.assets.reduce((loader, [ name, src ]) => 
            loader.add(name, src), this.app.loader
        )
        .load(() => {
            if (this.options.scenes.length) this.registerScenes();
            this.options?.onInit(this);
        });
    }

    registerScenes() {
        this.options.scenes.forEach(scene => {
            if (scene.isDefault) {
                scene.instance = (new scene.scene())
                    .setApp(this.app)
                    .setEngine(this)
                    .init()
                    .instance;
                this.app.stage.addChild(scene.instance);
            }
            this.scenes[scene.name] = scene;
        });
    }

    normalizeScreen() {
        const styles = `
        <style>
            * {
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }
        </style>
        `;
        document.body.innerHTML += styles;
    }
}