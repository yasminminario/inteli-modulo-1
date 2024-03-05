// Classe responsável pela cena principal do jogo
class JogoPenguim extends Phaser.Scene {

    constructor() {
        super({
            key: 'JogoPenguim',
            // Configurações de física do jogo
            physics: {
                arcade: {
                    debug: false, // Modo de depuração desativado
                    gravity: { y: 50 } // Gravidade aplicada no eixo Y
                }
            }
        });

        // Inicialização da pontuação de petiscos
        this.petiscos = 0;
    }

    // Pré-carregamento de recursos
    preload() {
        this.load.image('fundo', 'assets/fundo.jpg');
        this.load.image('logo', 'assets/logo-inteli_branco.png');
        this.load.image('alexandre', 'assets/alexandre.png');
        this.load.image('peixe', 'assets/peixe.png');
    }

    // Criação dos elementos na cena
    create() {
        // Adição de imagens de fundo e logo
        this.add.image(300, 400, 'fundo');
        this.add.image(150, 500, 'logo').setScale(0.5);

        // Adição do sprite do pinguim com física ativada
        this.pinguim = this.physics.add.sprite(400, 300, 'alexandre').setScale(0.8);
        this.pinguim.body.allowGravity = false; // Desativa a gravidade para o pinguim

        // Adição do sprite do peixe com física ativada
        this.peixe = this.physics.add.sprite(this.game.config.width / 2, 0, 'peixe');
        this.peixe.setScale(0.5);
        this.peixe.setCollideWorldBounds(true);
        this.peixe.setBounce(0.7);
        this.peixe.body.allowGravity = false; // Desativa a gravidade para o peixe

        // Adição do placar para exibir a pontuação
        this.placar = this.add.text(150, 50, `petiscos: ` + this.petiscos, {
            fontSize: '25px',
            fill: '#ffffff'
        });

        // Adição de uma sobreposição entre o pinguim e o peixe para detectar colisões
        this.physics.add.overlap(this.pinguim, this.peixe, () => {
            this.peixe.setVisible(false); // Torna o peixe invisível
            const posicaoPeixe = Phaser.Math.RND.between(50, this.game.config.width - 50);
            this.peixe.setPosition(posicaoPeixe, 100); // Reposiciona o peixe acima da tela
            this.peixe.setVisible(true); // Torna o peixe visível novamente

            this.petiscos += 1; // Incrementa a pontuação
            this.placar.setText(`petiscos:` + this.petiscos); // Atualiza o texto do placar
        });
    }

    // Atualização da cena durante o jogo
    update() {
        // Atualiza a posição do pinguim com base na posição do cursor/touch
        this.pinguim.x = this.input.x;
        this.pinguim.y = this.input.y;

        // Verifica se o pinguim está perto das bordas para virar horizontalmente
        if (this.pinguim.x < 50) {
            this.pinguim.setFlipX(true);
        } else if (this.pinguim.x > this.game.config.width - 50) {
            this.pinguim.setFlipX(false);
        }
    }
}




