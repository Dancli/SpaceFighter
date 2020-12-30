class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'enemy');

        this.scene = scene;
        
    }

    // Enemies will just fall off at random speeds, future movement patterns are pending.

    animations() {

        this.scene.anims.create({
            key:'down',
            frames: [ { key: 'enemy', frame: 3 } ],
            frameRate: 10
        });
    }

    down() {
        this.velocity.y = Phaser.Math.Between(50, 100);
        this.anims.play('down', true);
    }
}

class EnemyGroup extends Phaser.Physics.Arcade.Group {

    constructor(scene) {
        super(scene.physics.world, scene);
        this.scene = scene;
        this.createMultiple({
            classType: Enemy,
            key: 'enemy',
            frameQuantity: 10,
            active: true,
            visible: true,
            createCallback: function() {
                const enemy = new Enemy(this.scene, Phaser.Math.Between(0, this.scene.cameras.main.width), 0);
                enemy.animations();
                enemy.down();
                this.add(enemy);
            }
        });
    }

    spawnEnemy() {
            
    }
}

export default EnemyGroup;