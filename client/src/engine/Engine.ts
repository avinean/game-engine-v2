import { Application } from 'pixi.js';
import ImageContainer from './ImageContainer';
import ApplicationOptions from './models/ApplicationOptions';
import SceneConfig from './models/SceneConfig';
import resizer from './Resizer';

export default class Engine<S extends string, A extends string> {
    app: Application;
    options: ApplicationOptions<S, A>;
    scenes: Record<S, SceneConfig<S, A>> = {} as Record<S, SceneConfig<S, A>>;
    resizer = resizer;

    constructor(options: ApplicationOptions<S, A> = { scenes: [], assets: [] }) {
        this.options = options;
        this.init();
    }

    private init(): void {
        const {
            applicationsConfig,
            normalizeScreen,
            responsive,
            assets,
            background,
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
            if (background) this.registerBackground();
            if (scenes.length) this.registerScenes();
            if (responsive) this.registerResizer();
            this.resizer.init();
            onInit?.(this);
        });
    }

    private registerBackground() {
        const texture = this.app.loader.resources[
            this.options?.background
        ].texture;
        const bg = new ImageContainer(texture);
        this.app.stage.addChild(bg);
    }

    private registerScenes() {
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

    private registerResizer() {
        this.resizer.add(({ width, height }) => {
            this.app.stage.width = width;
            this.app.stage.height = height;
        });
    }

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
