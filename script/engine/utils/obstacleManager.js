

export class ObstacleManager {
    obstacles = [];

    add(obstacle) {
        this.obstacles.push(obstacle);
    }

    draw(ctx) {
        this.obstacles.forEach(obstacle => obstacle.draw(ctx));
    }

    updateOldPosition(){
        this.obstacles.forEach(obstacle => obstacle.updateOldPosition());
    } 
} 