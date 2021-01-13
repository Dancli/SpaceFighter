class EnemyLaser extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'enemy-laser');

    }

    /*
        Enemies will fire lasers in order to defeat the player.
        Enemy lasers work the same way as the ones used by the player, but they move slower and in the opposite direction.
        Lasers will respawn over again.
    */
    fire(x, y) {
        this.body.reset(x, y);
        this.enableBody(
            true,
            x,
            y,
            true,
            true
        );
        this.scene.sound.play('shoot-02');
        this.setVelocityY(240);

    }

    // Enemy lasers will disappear once they reach the bottom of the screen.
    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.y >= 640) {
            this.disableBody(true, true);
        }

    }
}

class EnemyLaserGroup extends Phaser.Physics.Arcade.Group {

    constructor(scene) {
        super(scene.physics.world, scene);

        this.config = {
            classType: EnemyLaser,
            key: 'enemy-laser',
            frameQuantity: 50,
            active: false,
            visible: false,
            setXY: {
                x: -200,
                y: -200
            },
            repeat: -1
        };

        this.createMultiple(this.config);

    }

    // Allows each member of the pool to move at medium speeds accross the screen towards the bottom.
    fireLaser(x, y) {
        const enemyLaser = this.getFirstDead(false);
        if (enemyLaser) {
            enemyLaser.fire(x, y);
        }
        
    }
}

export default EnemyLaserGroup;
