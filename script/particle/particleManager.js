import Particle from './particle.js';
import { randint } from '../utils/randint.js';
import Generator from '../generator/generator.js';

/**
 * Class representing a ParticleManager
 * 
 * Manage all the particles
 */
export default class ParticleManager {
	/** @type{*} all - all particles */
	all=[];

	generatorList = [];
	deltaTime = 0.175;

	/** 
	 * Creates a ParticleManager 
	 * 
	 * All particles are created
	 * 
	 * @param{int} n - the total number (the max) of particles
	 */
	constructor(n) {
		this.all=Array.from(new Array(n),() => new Particle());
	}
	
	/**
	 * update all particles at each time step (at each image)
	 */
	update(frictionValue, ...forces) {
		this.generatorList.forEach(gen => gen.nbBirth += gen.birthRate);

		let genNeedChild = this.generatorList.filter(generator => generator.nbBirth >= 1);

		this.all.forEach(particle => {
			if(particle.isAlive){
				particle.timeToLive -= 1;
				particle.motion(this.deltaTime, frictionValue, forces);
			}else{
				const i = randint(0, genNeedChild.length-1);
				if(genNeedChild[i]){
					genNeedChild[i].initParticle(particle);
					genNeedChild[i].nbBirth -= 1;
					if(genNeedChild[i].nbBirth < 1)
						genNeedChild = this.generatorList.filter(generator => generator.nbBirth >= 1);
				}
			}
		});
	}

	/**
	 *   draw all particles (should be called at each image)
	 * 
	 * @param {*} ctx - the canvas context
	 */
	draw(ctx) {
		this.generatorList.forEach(generator => generator.draw(ctx));
		this.all.forEach(particle => {
			if(particle.isAlive) particle.draw(ctx);
		});
	}

	/**
	 * 
	 * @param {Generator} generator 
	 */
	add(generator) {
		this.generatorList.push(generator);
	}
}
