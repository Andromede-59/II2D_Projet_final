/**
 * Class that separates keyboard/mouse events from engine
 * engine should have methods :
 * - selectMouse(x,y) : when left mouse button is pressed
 * - moveMouse(x,y)   : when the mouse is dragged (while left button pressed)
 */
export default class InteractEngine {
  
	/** @type{*} the engine that receives messages from mouse/keyboard. The object should have a context canvas. */
	engine = null;
	/** @type{boolean} true while left mouse is pressed */            
	leftMousePressed = false; 
	/** @type{boolean} true while right mouse is pressed */
	rightMousePressed = false;
	/** @type{*} the canvas of the engine (that captures keyboard/mouse events) */ 
	canvas = null;

	/**
	 * Creates an InteracEngine
	 * @param {Engine} engine 
	 */
	constructor(engine) {
		this.engine = engine;
		
		this.canvas=this.engine.ctx.canvas;
		
		canvas.oncontextmenu = (e) => e.preventDefault(); // to have right mouse button interaction without the default context menu of the web navigator

		canvas.addEventListener('mousedown',this.mouseDown.bind(this));
		canvas.addEventListener('mousemove',this.mouseMove.bind(this));
		canvas.addEventListener('mouseup',this.mouseUp.bind(this));
		canvas.addEventListener('keydown',this.keyDown.bind(this));
	}
		
	/**
	 * Handler for mousedown
	 * @param {*} event 
	 */
	mouseDown(event) {
		const mouseX = event.layerX-this.canvas.offsetLeft;
		const mouseY = event.layerY-this.canvas.offsetTop;

		switch(event.button) {
		case 0: // left button
			this.leftMousePressed = true;
			this.engine.selectMouse(mouseX,mouseY);
			break;
		case 2: // right button
			this.rightMousePressed = true;
			this.engine.selectRightMouse(mouseX,mouseY);
			break;
		default:break;
		}
		
	}
	
	/**
	 * Handler for mousemove
	 * @param {*} event 
	 */
	mouseMove(event) { 
		const mouseX = event.layerX-this.canvas.offsetLeft;
		const mouseY = event.layerY-this.canvas.offsetTop;
		if (this.leftMousePressed) { // the mouse is considered in motion for the engine only if the left mouse is pressed
			this.engine.moveMouse(mouseX,mouseY);
		}
		if (this.rightMousePressed) { // same for the right mouse button
			this.engine.selectRightMouse(mouseX, mouseY);
		}
	}
	
	/**
	 * Handler for mouseup
	 * @param {*} event 
	 */
	mouseUp(event) {
		switch(event.button) {
			case 0:
				this.leftMousePressed=false;
				this.engine.deSelectMouse();
				break;
			case 2:
				this.rightMousePressed=false;
				this.engine.deSelectRightMouse();
				break;
			default:break;
		}    
	}
	
	/**
	 * Handler for keydown
	 * @param {*} event 
	 */
	keyDown(event) {
		switch(event.key) {
			case 'a': case 'A': this.engine.slower();break;
			case 'z': case 'Z': this.engine.faster();break;
			case 'q': case 'Q': this.engine.strongerMouse(); break;
			case 's': case 'S': this.engine.weakerMouse(); break;
			case 'w': case 'W': this.engine.strongerFriction(); break;
			case 'x': case 'X': this.engine.weakerFriction(); break;
			default:break;
		}
	}
	
	
	
	
}
