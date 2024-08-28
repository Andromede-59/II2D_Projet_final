import { randint } from '../utils/randint.js';

/**
 * Class representing mutable 2D Vector 
 */
export default class Vector {
	/** @type{float} x - x-axis coordinate */
	x=0;
	/** @type{float} y - y-axis coordinate */
	y=0;
	
	
	/**
	 * Creates a 2D Vector
	 * @param {*} x - x-axis coordinate
	 * @param {*} y - y-axis coordinate
	 */
	constructor(x,y) {
		this.x=x;this.y=y;
	}

	/**
	 * Set this to the value of p (copy p to this)
	 * @param {Vector} p 
	 * @returns this (allows chained operation)
	 */
	set(p) {
		this.x=p.x;
		this.y=p.y;
		return this; // allows chain operation
	}

	/**
	 * Returns a copy of this
	 * @returns 
	 */
	clone() {
		return new Vector(this.x,this.y);
	}
		
	/**
	 * Set x,y coordinates
	 * @param {float} x - y-coordinate
	 * @param {float} y - x-coordinate
	 * @returns 
	 */
	setXY(x,y) {
		this.x=x;
		this.y=y;
		return this; // allows chain
	}
	
	/**
	 * Add u to this (mutates this; corresponds to the operation this+=u)
	 * @param {Vector} u 
	 * @returns 
	 */
	add(u) {
		this.x+=u.x;
		this.y+=u.y;
		return this; // allows chain
	}

	/**
	 * Returns the new Vector that is p1+p2
	 * @param {*} p1 - first vector
	 * @param {*} p2 - second vector
	 * @returns 
	 */
	static add(p1,p2) {    
		return new Vector(p1.x+p2.x,p1.y+p2.y);
	}

	/**
	 * Returns a string representation of this
	 * @returns a string represenation of this
	 */
	toString() {
		return "("+this.x+","+this.y+")";
	}
	
	/**
	 * Set random coordinates in a box
	 * @param {Vector} c Vector, the center of the box
	 * @param {Vector} s Vector, the size of the box
	 */
	setRandBox(c, s) {
		const x = randint(c.x - (s.x >> 1), c.x + (s.x >> 1));
		const y = randint(c.y - (s.y >> 1), c.y + (s.y >> 1));
		return this.setXY(x, y);
	}

	/**
	 * Returns the new Vector that is b-a
	 * @param {Vector} a - first vector
	 * @param {Vector} b - second vector
	 * @returns Vector
	 */
	static direction(a, b) {
		return new Vector(b.x - a.x, b.y - a.y);
	}

	static length(u) {
		return Vector.distance(u, new Vector(0,0));
	}

	length() {
		return Vector.length(this);
	}

	/**
	 * Returns the distance beetwin u and v
	 * @param {Vector} u - first vector
	 * @param {Vector} v - second vector
	 * @returns scalaire
	 */
	static distance(u, v) {
		return Math.sqrt((u.x - v.x)**2 + (u.y - v.y)**2);
	}

	/**
	 * Returns the dot product of a and b
	 * @param {Vector} a - first vector
	 * @param {Vector} b - second vector
	 * @returns scalaire
	 */
	static dot(u, v) {
		return u.x * v.x + u.y * v.y;
	}

	/**
	 * return the direction of ku
	 * @param {float} k - number
	 * @param {Vector} u - vector
	 * @returns Vector
	 */
	static mul(k, u) {
		return new Vector(k * u.x, k * u.y);
	}
	
	/**
	 * return the normal vector of v
	 * @param {Vector} v - vector
	 * @returns Vector
	 */
	static normal(v) {
		return new Vector(-v.y, v.x);
	}

	/**
	 * return the normal (dist = 1) vector of v
	 * @param {Vector} v - vector
	 * @returns Vector
	 */
	static norm(v) {
		return new Vector(v.x/Vector.length(v), v.y/Vector.length(v));
	}

	static egaux(v, u){
		return v.x == u.x && v.y == u.y;
	}

	static center(u, v){
		return new Vector((u.x + v.x)>>1, (u.y + v.y)>>1);
	} 
}
