import Vector from "../../utils/vector.js";
import Engine from "../engine.js";
import Generator from "../../generator/generator.js";
import Attractor from '../../attractor/Attractor.js';
import { Circle } from "../../obstacles/circle.js";
import { Segment } from "../../obstacles/segment.js";

export class EngineRendu_1 extends Engine {

    constructor(ctx){
        super(ctx, 100000);
    } 

    /**
     *  Override super.initialize()
     */
    initialize() {
        console.log("new init");
        this.frictionValue = 0.5;
		const gen1 = new Generator(new Vector(200,50),new Vector(10,10), 10, 0);
        const attr1 = new Attractor(new Vector(200, 110), 15, -900);
        const attr2 = new Attractor(new Vector(190, 230), 20, 1360);

        const cercle = new Circle(new Vector(280, 160), 30);
        const segment = new Segment(new Vector(0, 0), new Vector(500, 500));

		this.addGenerator(gen1);
        this.addAttractor(attr1);
        this.addAttractor(attr2);
        this.addObstacle(cercle);
        this.addObstacle(segment);
    }
}

export class EngineRendu_2 extends Engine {

    constructor(ctx){
        super(ctx, 100000);
    } 

    /**
     *  Override super.initialize()
     */
    initialize() {
        console.log("new init");
        this.frictionValue = 1;
		const gen1 = new Generator(new Vector(50,50),new Vector(10,10), 1, 0);
        const gen2 = new Generator(new Vector(225,50),new Vector(10,10), 10, 0);

        const attr1 = new Attractor(new Vector(225, 100), 15, -800);
        const attr2 = new Attractor(new Vector(325, 300), 15, 600);
        const attr3 = new Attractor(new Vector(125, 300), 15, 600);

        const segment1 = new Segment(new Vector(0, 200), new Vector(100, 260));
        const segment2 = new Segment(new Vector(340, 200), new Vector(360, 210));

		this.addGenerator(gen1);
        this.addGenerator(gen2);
        this.addAttractor(attr1);
        this.addAttractor(attr2);
        this.addAttractor(attr3);

        this.addObstacle(segment1);
        this.addObstacle(segment2);
    }
}