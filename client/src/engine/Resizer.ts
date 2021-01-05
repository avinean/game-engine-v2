import { ResizerCallbackParams } from "./models/ResizerCallbackParams";

type ResizerCallback = (params: ResizerCallbackParams) => void;

class Resizer {
    private handlers: ResizerCallback[] = [];
    private resizerInited: boolean;

    add(handler: ResizerCallback) {
        if (this.handlers.includes(handler)) return;
        this.handlers.push(handler);
    }

    remove(handler: ResizerCallback) {
        const index = this.handlers.indexOf(handler);
        if (index < 0) return;
        this.handlers.splice(index, 1);
    }

    init() {
        if (this.resizerInited) return;
        this.resizerInited = true;
        window.addEventListener('resize', () => {
            this.onResize();
        });
        this.onResize();
    }

    private onResize() {
        const { innerWidth, innerHeight } = window;
        const isAlbum = innerWidth > innerHeight;
        this.handlers.forEach(cb => cb({
            width: innerWidth,
            height: innerHeight,
            isAlbum
        }));
    }
}

const resizer = new Resizer;

export default resizer;