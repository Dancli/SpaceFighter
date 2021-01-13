class IntroScene extends Phaser.Scene {
    constructor() {
        super('intro');

    }

    preload() {
        this.load.audio('intro-music', 'static/audio/intro-music.wav');

    }

    create() {

        const introMusic = this.sound.add('intro-music', { volume: 1 });
        introMusic.play();

        const x = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const y = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.add.text(x, 100, 'Space Fighter', {
            fontSize: '36px',
            color: '#fff'
        }).setOrigin(0.5);

        this.add.text(x, y, 'Click to go start the game', {
            fontSize: '14px',
            color: '#fff'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            introMusic.destroy();
            this.registry.destroy();
            this.scene.start('game');
        }, this);
    }

    update() {

    }
}

export default IntroScene;