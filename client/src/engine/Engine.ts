import { Application } from 'pixi.js';
import BaseScene from './BaseScene';
import ApplicationOptions from './models/ApplicationOptions';
import SceneConfig from './models/SceneConfig';
import resizer from './Resizer';

export default class Engine<S extends string, A extends string> {
    app: Application;
    options: ApplicationOptions<S, A>;
    private scenes: Record<S, SceneConfig<S, A>> = {} as Record<S, SceneConfig<S, A>>;
    private currentScene: SceneConfig<S, A>;
    resizer = resizer;

    constructor(options: ApplicationOptions<S, A> = { scenes: [], assets: [] }) {
        this.options = options;
        this.init();
    }

    private init(): void {
        const {
            applicationsConfig,
            normalizeScreen,
            responsive, //TODO
            assets,
            background, // TODO
            scenes,
            onInit
        } = this.options;
        this.app = new Application(applicationsConfig);        
        this.app.renderer.view.style.position = "absolute";
        this.app.renderer.view.style.display = "block";
        this.app.renderer.resize(window.innerWidth, window.innerHeight);


        if (normalizeScreen) this.normalizeScreen();

        document.body.appendChild(this.app.view);

        this.app.loader.add(assets)
        .load(() => {
            this.registerScenes();
            // if (responsive) this.registerResizer();
            this.resizer.init();
            onInit?.(this);
        });
    }

    private registerScenes() {
        if (!this.options.scenes.length) {
            console.warn('NO SCENES ADDED TO ENGINE');
            return;
        }
        this.options.scenes.forEach(scene => {
            this.scenes[scene.name] = scene;
            if (scene.isDefault) {
                this.activateScene(scene.name);
            }
        });
        if (!this.currentScene) {
            this.activateScene(this.options.scenes[0].name);
        }
    }

    activateScene(key: S) {
        if (this.currentScene) {
            this.currentScene.instance.visible = false;


            if (key === this.currentScene.name) {
                console.warn(`YOU ARE TRYING TI ACTIVATE SCENE "${key}" WHICH IS ALREADY ACTIVATED`);
                return;
            }
        }

        const scene = this.scenes[key];
        if (!scene.instance) {
            scene.instance = (new scene.scene())
                .setApp(this.app)
                .setEngine(this)
                .init()
                .instance;

            this.app.stage.addChild(scene.instance);
        }

        scene.instance.visible = true;
        this.currentScene = scene;
    }

    // private registerResizer() {
    //     this.resizer.add(({ width, height }) => {
    //         this.app.stage.width = width;
    //         this.app.stage.height = height;
    //     });
    // }

    private normalizeScreen() {
        const styles = document.createElement('style');
        styles.textContent = `
            * {
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }
        `;
        document.body.appendChild(styles);
    }
}
