class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'enemy');

        this.scene = scene;
    }

    /* 
        Enemies will start firing 0.5 seconds after respawning. 
        They will continue doing this action each 1.5 seconds. 
        5 seconds after respawn, enemies will stop firing. 
        Dead (invisible) enemies will stop firing.
    */
   fire(enemyLasers) {
    const delayFire = () => {
        if (this.visible == true) {
            enemyLasers.fireLaser(this.x, this.y + 21.5);
        } else {
            this.scene.time.removeEvent(timerEvent);
        }
    };
    let timerDelay = 500;
    let timerEvent;
    while (timerDelay < 5000) {
        timerEvent = this.scene.time.delayedCall(timerDelay, delayFire, [], this.scene);
        timerDelay += 1500;
    }
    
}

    /* 
        Enemies will appear in a random horizontal position from the top of the screen. 
        Enemies will follow a straight pattern towards the bottom of the screen.
        Fallen enemies will spawn again over time. 
    */
    spawn() {
        this.enableBody(
            true, 
            Phaser.Math.Between(39, this.scene.cameras.main.width - 39), 
            0, 
            true, 
            true
        );
        this.setVelocityY(Phaser.Math.Between(90, 150));
        this.anims.play('enemyDown', true);
    }

    // Enemies will disappear if they reach the bottom of the screen.
    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.y > this.scene.cameras.main.height + 41) {
            this.disableBody(true, true);
        }
    }
}

class EnemyGroup extends Phaser.Physics.Arcade.Group {

    constructor(scene) {
        super(scene.physics.world, scene);
        
        this.config = {
            classType: Enemy,
            key: 'enemy',
            frameQuantity: 10,
            active: false,
            visible: false,
            setXY: {
                x: -200,
                y: 0
            }
        };

        this.createMultiple(this.config);
        
    }

    /*
        In the future, enemies could follow new movement patterns. 
        New animations might be needed, so this method would cover them all.
    */
    enemyAnimations() {
        this.scene.anims.create({
            key:'enemyDown',
            frames: [ { key: 'enemy', frame: 3 } ],
            frameRate: 10
        });

    }

    // This allows all members of the pool to spawn and shoot lasers.
    addEnemy(enemyLasers) {
        const enemy = this.getFirstDead(false);
        if (enemy) {
            enemy.spawn();
            enemy.fire(enemyLasers);
        }

    }
}

export default EnemyGroup;
