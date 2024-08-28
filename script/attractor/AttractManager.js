import Attractor from './Attractor.js';

export default class AttractManager {
	/** @type{*} all - all particles */
	attractors=[];

	/**
	 *   draw all particles (should be called at each image)
	 * 
	 * @param {*} ctx - the canvas context
	 */
	draw(ctx) {
		this.attractors.forEach(attractor => {
			attractor.draw(ctx);
		});
	}

	/**
	 * 
	 * @param {Attractor} Attractor 
	 */
	add(attractor) {
		this.attractors.push(attractor);
	}

    get forces() {
        return this.attractors.map(attractor => attractor.force);
    }
}
