import { Application, utils, Sprite } from 'pixi.js';

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

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app: Application = new Application();
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
// app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

app.loader
    .add("../src/assets/images/main.jpg")
    .load(() => {
        const testBG = new Sprite(
            app.loader.resources["../src/assets/images/main.jpg"].texture
        );
        app.stage.addChild(testBG);
    })