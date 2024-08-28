import Vector from '../utils/vector.js';

/**
 * Class representing a particle
 */

const PARTICLE_SIZE_X = 5;
const PARTICLE_SIZE_Y = 5;

export default class Particle {
	/** @type{Vector} - particle position */ 
	position = new Vector(0,0);
	velocity = new Vector(0,0);

	oldPosition = new Vector(0,0);
	oldVelocity = new Vector(0,0);

	ttlConst = 0;
	timeToLive = 0;
	color = {r:0, g:0, b:0};	


	/**
	 * @param {{ r: any; g: any; b: any; }} newColor
	 */
	set color(newColor) {
		this.color.r = newColor.r;
		this.color.g = newColor.g;
		this.color.b = newColor.b; 
	}

	get isAlive() {
		return this.timeToLive > 0;
	}

	#alpha() {
		return Math.min(1, this.timeToLive/this.ttlConst);
	}

	force(frictionValue, forces, treshold = 10) {
		const res = new Vector(0, 9.81);
		res.add(Vector.mul(-frictionValue, this.velocity));
		forces.filter(force => force).forEach(force => {
			if(Vector.distance(this.position,force.vector) >= treshold){
				const kDivd2 = force.value / (Vector.distance(this.position,force.vector)**2);
				const mMoinp = Vector.direction(this.position, force.vector);
				res.add(Vector.mul(kDivd2,mMoinp));
			}
		});		

		return res;
	}

	/**
	 * Draw a particle in the canvas context ctx
	 * @param {*} ctx - the canvas context
	 */
	draw(ctx) {
		ctx.fillStyle=`rgba(${this.color.r},${this.color.g},${this.color.b},${this.#alpha()})`;
		ctx.fillRect(this.position.x, this.position.y, PARTICLE_SIZE_X, PARTICLE_SIZE_Y);
	}

	setRandomPosition(c, s) {
		this.position.setRandBox(c, s);
		this.oldPosition.set(this.position);
	}

	setRandomColor(newColor) {
		this.color = newColor;
	}

	motion(deltaTime, frictionValue, forces) {
		this.oldPosition.set(this.position);
		this.oldVelocity.set(this.velocity);
		this.velocity.add(Vector.mul(deltaTime, this.force(frictionValue, forces)));
		this.position.add(Vector.mul(deltaTime, this.velocity));
	}

	/**
	 * 
	 * @param {Vector} c 
	 * @param {Vector} n 
	 */
	impulse(c, n, obstacleSpeed,eps = 1) {
		// cf cours	
		const vnnew = Vector.mul(Vector.dot(this.velocity, n), n);

		// this.velocity.add(Vector.mul(-1-eps, Vector.direction(obstacleSpeed, vnnew))); <-- non fonctionnel avec la vitesse ajoutée
		this.velocity.add(Vector.mul(-1-eps,vnnew));

		const h = Vector.mul(Vector.dot(Vector.direction(c, this.position), n), n);
		this.position.add(Vector.mul(-1-eps-(PARTICLE_SIZE_X>>1), h));
	}
}
