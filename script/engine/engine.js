import ParticleManager from '../particle/particleManager.js';
import Vector from '../utils/vector.js';
import Generator from '../generator/generator.js';
import { SelectableManager } from './utils/selectableManager.js';
import { ObstacleManager } from './utils/obstacleManager.js';
import AttractManager from '../attractor/AttractManager.js';
import { Circle } from '../obstacles/circle.js';
import { Segment } from '../obstacles/segment.js';
import Attractor from '../attractor/Attractor.js';

/** 
 * Class representing the particle engine  
 * 
*/
const NB_PARTICLES = 10000;

export default class Engine {

    /** @type{*} canvas context */  
    ctx=null;
    /** @type{float} time step between 2 images for simulation; 0.016 seconds corresponds to "real-time" for the simulation if there is 60 images per second */
    deltaTime = 0.016;
    /** @type{ParticleManager} the manager that contains all particles */
    particleManager = null;

	isMouseSelect = false;
	isMouseMove = false;

	mouse = new Vector(0,0);
	oldMouse = new Vector(0,0);

	selectableManager = new SelectableManager();
	obstacleManager = new ObstacleManager();
    attractManager = new AttractManager();

    mouseFforce = null;
    pointerForceValue = 500;

    frictionValue = 0.01;

    animation = null;

    /**
     * Creates an engine
     * @param {*} ctx - the drawing context
     */
    constructor(ctx, nbparticles = NB_PARTICLES) {
    	this.ctx=ctx;
    	this.particleManager=new ParticleManager(nbparticles);
    }

    /**
     * entry point of the engine : initialize the engine then start the main loop
     */
    start() {
    	this.initialize();
    	this.loop();
    }
    
    /**
     *   proceed all initializations (generators, obstacles, ...). Should be called once (from method start and before loop())
     */
    initialize() {
		const gen1 = new Generator(new Vector(200,100),new Vector(70,70), 1.5, 1000);
		const gen2 = new Generator(new Vector(300,300),new Vector(100,150), 2.5, 10);
		const obs1 = new Circle(new Vector(30,30),50);
		const obs2 = new Segment(new Vector(100,200),new Vector(250,300));

        const attr1 = new Attractor(new Vector(60, 200), 20, 400);
        const attr2 = new Attractor(new Vector(400, 100), 20, 500);
        const attr3 = new Attractor(new Vector(10, 10), 20, -1000);

		this.addGenerator(gen1);
        this.addGenerator(gen2);
        this.addObstacle(obs1);
        this.addObstacle(obs2);
        this.addAttractor(attr1);
        this.addAttractor(attr2);
        this.addAttractor(attr3);
    }

    /**
     * 
     * @param {Generator} generator 
     */
    addGenerator(generator) {
        this.particleManager.add(generator);
        this.selectableManager.add(generator);
    }

    /**
     * obstacle should have draw() move(Vector) and distance(Vector)
     * @param {*} obstacle 
     */
    addObstacle(obstacle) {
        this.obstacleManager.add(obstacle);
        this.selectableManager.add(obstacle);
    }

    /**
     * 
     * @param {Attractor} attractor 
     */
    addAttractor(attractor) {
        this.attractManager.add(attractor);
        this.selectableManager.add(attractor);
    }

    /**
     * update all data at each frame (called from the main loop)
     */
    updateData() {
        

		if (this.isMouseSelect) {
			this.isMouseSelect = false;
			this.selectableManager.select(this.mouse);
		}
		if (this.isMouseMove) {
			this.isMouseMove = false;
            const direction = Vector.direction(this.oldMouse, this.mouse);
			this.selectableManager.move(direction);
		}

		if(this.mouse)
			this.oldMouse.set(this.mouse);

        this.particleManager.update(this.frictionValue, this.mouseFforce, ...this.attractManager.forces);
        
        this.collision();

        this.obstacleManager.updateOldPosition();
    }

    solveCollision(particle, obstacle) {
        const res = obstacle.detect(particle.oldPosition, particle.position, this.deltaTime);
        if(res.isCollide) {
            particle.impulse(res.point, res.norm, res.speed);
        }
    }

    collision() {
        this.particleManager.all
        .filter(particle => particle.isAlive)
        .forEach(particle => {
            this.obstacleManager.obstacles.forEach(obstacle => this.solveCollision(particle, obstacle));
        });
    }
    
    /**
     *   draw all data on the canvas (using the context this.ctx) at each frame (called from main loop)
     */
    draw() {
    	this.ctx.fillStyle='rgb(200,255,230)';
    	this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height); // clear all canvas
        this.particleManager.draw(this.ctx);
        this.obstacleManager.draw(this.ctx);
        this.attractManager.draw(this.ctx);
    }


    
    /**
     * main loop = updateData, then draw, then redo for each frame
     */
    loop() {
    	this.updateData();
      	this.draw();
      	this.animation = window.requestAnimationFrame(this.loop.bind(this));
    }
    

    /**
     * Called when mouse button pressed (see InteractEngine)
     * @param {int} x - x in window coordinates relative to the canvas (of this.ctx)
     * @param {int} y - y in window coordinates relative to the canvas (of this.ctx)
     */
    selectMouse(x,y) {
    	console.log("left mouse click :"+x+","+y);
		this.isMouseSelect = true;
		this.mouse = new Vector(x,y);
        this.oldMouse = this.mouse.clone();
    }

    /**
     * Called when mouse button pressed (see InteractEngine)
     * @param {int} x - x in window coordinates relative to the canvas (of this.ctx)
     * @param {int} y - y in window coordinates relative to the canvas (of this.ctx)
     */
    selectRightMouse(x, y) {
        this.mouseFforce = {vector:new Vector(x, y), value:this.pointerForceValue} ;
    }

	deSelectMouse() {
		this.isMouseSelect = false;
		this.isMouseMove = false;
		this.mouse = null;
		this.selectableManager.deSelect();
	}

    deSelectRightMouse() {
        this.mouseFforce = null;
    }
    
    /**
     *  Called when the mouse moves **while** left button is pressed
     * 
     * @param {int} x - x in window coordinates relative to the canvas (of this.ctx)
     * @param {int} y - y in window coordinates relative to the canvas (of this.ctx)
     */
    moveMouse(x,y) {
    	//console.log("left mouse move :"+x+","+y);
		this.isMouseMove = true;
		this.mouse = new Vector(x,y);
    }

    /**
     * time step of the simulation between two images increases (speed up simulation)
     */
    faster() {
    	this.deltaTime *= 1.10;
      	console.log(`deltaTime = ${this.deltaTime}`);
    }
      
    /**
     * time step of the simulation between two images decreases (slow down simulation)
     */
    slower() {
      	this.deltaTime *= 0.9;
      	console.log(`deltaTime = ${this.deltaTime}`);
    }

    updateForceValue() {
        if(this.mouseFforce) {
            this.mouseFforce.value = this.pointerForceValue;
        }
    }

    strongerMouse(){
        this.pointerForceValue *= 1.1;
        console.log(`pointerForceValue = ${this.pointerForceValue}`);

        this.updateForceValue();
    }

    weakerMouse(){
        this.pointerForceValue *= 0.9;
        console.log(`pointerForceValue = ${this.pointerForceValue}`);

        this.updateForceValue();
    }

    strongerFriction(){
        this.frictionValue *= 1.1;
        if (this.frictionValue >= 10) {this.frictionValue = 10;}
        console.log(`frictionValue = ${this.frictionValue}`);
    }

    weakerFriction(){
        this.frictionValue *= 0.9;
        console.log(`frictionValue = ${this.frictionValue}`);
    }
}
