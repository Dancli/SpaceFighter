class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'enemy');

        this.scene = scene;
    }

    // Enemies will follow a straight movement pattern towards the bottom of the screen.
    down() {
        this.setVelocityY(Phaser.Math.Between(90, 150));
        this.anims.play('enemyDown', true);
    }

    // Enemies will start firing lasers 0.5 seconds after respawning. 
    // They will continue executing this action each 1.5 seconds.
    // Once they have remained active for 5 seconds, enemies will stop firing lasers.
    fire(enemyLasers) {
        const delayFire = () => {
            enemyLasers.fireLaser(this.x, this.y + 21.5);
        };
        let delay = 500;
        while (delay < 5000) {
            setTimeout(delayFire, delay);
            delay += 1500;
        }
    }

    // An enemy will spawn in a random horizontal position of the top of the screen.
    // A movement pattern is set for each enemy calling the down() method.
    spawn() {
        this.body.reset(Phaser.Math.Between(39, this.scene.cameras.main.width - 39), 0);
        this.setActive(true);
        this.setVisible(true);
        this.down();
    }

    // Sets an enemy inactive when they reach the end of the screen, leaving a free slot for another enemy to appear.
    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if(this.y >= this.scene.cameras.main.height + 21.5) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

class EnemyGroup extends Phaser.Physics.Arcade.Group {

    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple(
            {
                classType: Enemy,
                key: 'enemy',
                frameQuantity: 10,
                active: false,
                visible: false,
                repeat: -1
            }
        );
    }

    // In the future, enemies would follow new movement patterns. Animations for each of them could be configured here.
    enemyAnimations() {
        this.scene.anims.create({
            key:'enemyDown',
            frames: [ { key: 'enemy', frame: 3 } ],
            frameRate: 10
        });
    }

    // Allows each member of the enemy group to spawn and fire lasers.
    addEnemy(enemyLasers) {
        const enemy = this.getFirstDead(false);
        if (enemy) {
            enemy.spawn();
            enemy.fire(enemyLasers);
        }
    }
}

export default EnemyGroup;