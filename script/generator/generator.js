import Vector from '../utils/vector.js';
import { randomColor } from '../utils/randomColor.js';
import { randint } from '../utils/randint.js';


export default class Generator {
    center = new Vector(0,0);
    size = new Vector(0,0);

    nbBirth;
    birthRate;
    particleTimeToLiveMin = 200;
    particleTimeToLiveMax = 300;
    v_x = [-5, 5];
    x_y = [-5, 5];

    color = {r: 126, g: 255, b: 126};

    constructor(center, size, birthRate = 1, nbBirth = 0) {
        this.center.set(center);
        this.size.set(size);
        this.birthRate = birthRate;
        this.nbBirth = nbBirth;
    }

    initParticle(particle) {
        particle.setRandomPosition(this.center, this.size);
        particle.setRandomColor(randomColor());
        particle.timeToLive = randint(this.particleTimeToLiveMin, this.particleTimeToLiveMax);
        particle.ttlConst = particle.timeToLive;
        particle.velocity = new Vector(randint(...this.v_x), randint(...this.x_y));
    }
    
    /**
     * 
     * @param {Vector} m 
     */
    distance(m) {
        return Vector.distance(m, this.center);
    }

    /**
     * 
     * @param {Vector} m 
     */
    move(m) {
        this.center.add(m);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b}, 0.5)`;
        ctx.fillRect(this.center.x - (this.size.x>>1), this.center.y - (this.size.y>>1), this.size.x, this.size.y);
        ctx.fill();
    }
}