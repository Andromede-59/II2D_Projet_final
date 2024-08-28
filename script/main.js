import Engine from "./engine/engine.js";
import { EngineRendu_1, EngineRendu_2 } from "./engine/engineRendu/enginesRendu.js";
import InteractEngine from "./engine/interactEngine.js";

/**
 * Main Program
 * 
 * creates and starts the engine
*/

let engine = null;

const main = () => {
	const interactEngine = new InteractEngine(engine); // interactEngine calls specific methods (cf interactEngine.js) of engine when mouse/keyboard events occur

	engine.start(); // run the engine (initialization then simulation main loop)
}

const stopAnimation = (engine) => {
	if (engine){ 
		cancelAnimationFrame(engine.animation);
		engine.animation = null;
	}
}

const setup = () => {
	const ctx = document.getElementById("canvas").getContext("2d");

	document.getElementById("illustration1").addEventListener("click", () => {stopAnimation(engine); engine = new EngineRendu_1(ctx); main()});
	document.getElementById("illustration2").addEventListener("click", () => {stopAnimation(engine); engine = new EngineRendu_2(ctx); main()});
	
	engine = new Engine(ctx);
	main();
}

//
window.addEventListener("load", setup);
