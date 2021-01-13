class GameOverScene extends Phaser.Scene {
    constructor() {
        super('game-over');

    }

    preload() {
        this.load.audio('game-over-music', 'static/audio/game-over-music.wav');
    }

    create(data) {
                
        const gameOverMusic = this.sound.add('game-over-music', { volume:1 });
        gameOverMusic.play();

        const x = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const y = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.add.text(x, 100, 'Game Over', {
            fontSize: '56px',
            color: '#fff'
        }).setOrigin(0.5);

        this.add.text(x, 200, 'Your score: ' + data.score, {
            fontSize: '28px',
            color: '#fff'
        }).setOrigin(0.5);

        this.add.text(x, y, 'Click to go back to the intro screen', {
            fontSize: '14px',
            color: '#fff'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            gameOverMusic.destroy();
            this.registry.destroy();
            this.scene.start('intro');
        }, this);

    }

    update() {
        
    }
}

export default GameOverScene;
