// Definindo a cena principal do jogo usando a biblioteca Phaser
class JogoPenguim extends Phaser.Scene {

    constructor() {
        super({
            key: 'JogoPenguim',
            //física do jogo
            physics: {
               arcade: {
                debug: false,
                gravity: { y: 50 }
               } 
            } 
        });
    }

    preload() {
        this.load.image('fundo', 'assets/fundo.jpg');
        this.load.image('logo', 'assets/logo-inteli_branco.png');
        this.load.image('alexandre', 'assets/alexandre.png');
        this.load.image('peixe', 'assets/peixe.png');
    }

    create() {
        this.add.image(300, 400, 'fundo');
        this.add.image(150, 500, 'logo').setScale(0.5);

        this.pinguim = this.physics.add.sprite(400, 300, 'alexandre').setScale(0.8);
        this.pinguim.body.allowGravity = false;

        this.peixe = this.physics.add.sprite(this.game.config.width / 2, 0, 'peixe');
        this.peixe.setScale(0.5);
        this.peixe.setCollideWorldBounds(true);
        this.peixe.setBounce(0.7);
        this.peixe.body.allowGravity = false;

        this.placar = this.add.text(150, 50, `petiscos: ` + petiscos, {
            fontSize: '25px',
            fill: '#ffffff'
        });

        this.physics.add.overlap(this.pinguim, this.peixe, () => {
            this.peixe.setVisible(false);
            const posicaoPeixe = Phaser.Math.RND.between(50, this.game.config.width - 50);
            this.peixe.setPosition(posicaoPeixe, 100);
            this.peixe.setVisible(true);

            this.petiscos += 1;
            this.placar.setText(`petiscos:` + petiscos);
        });
    }

    update() {
        this.pinguim.x = this.input.x;
        this.pinguim.y = this.input.y;

        if (this.pinguim.x < 50) {
            this.pinguim.setFlipX(true);
        } else if (this.pinguim.x > this.game.config.width - 50) {
            this.pinguim.setFlipX(false);
        }
    }
}



