//conexão da declaração da cena por meio da estrutura de classe
class TelaJogar extends Phaser.Scene {

    constructor() {
        super({
            key: 'TelaJogar',
            backgroundColor: '#000', 
        });
    }

    preload() {
        this.load.html('form', 'form/form.html'); 
        this.load.image('start', 'assets/start.png');
    }

    create() {
        //configurações de teclas
        this.cursors = this.input.keyboard.createCursorKeys();
        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.nameFilled = false;

        //criação do texto "hello"
        var text = { height: 20, padding: 15, content: "Hello " }
        this.message = this.add.text(
            this.game.config.width / 2,
            this.game.config.height / 2 - text.padding * 2 - text.height,
            text.content, {
                color: "#FFFFFF",
                fontSize: 40,
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        //criação de espaço para adição do nome
        var inputSize = { width: 270, height: 42, padding: 15 };
        var inputButton = { width: 30, height: 12 };
        var inputCoords = {
            xposition: (this.game.config.width - inputSize.width) / 2 - inputButton.width,
            yposition: (this.game.config.height - inputSize.height - inputSize.padding * 2) / 2,
        };
        this.inputName = this.add.dom(inputCoords.xposition, inputCoords.yposition).createFromCache('form').setOrigin(0, 0);


        const nameOkTextButton = this.add.text(
            inputCoords.xposition + inputSize.width + 13,
            inputCoords.yposition + inputButton.height + 2, ">", {
                backgroundColor: "#8ecbf4",
                fontSize: 18,
                padding: 10
            }
        );
        nameOkTextButton.setInteractive();

        this.returnKey.on("down", event => {
            this.updateName(this.inputName);
        });

        nameOkTextButton.on('pointerdown', () => {
            this.updateName(this.inputName);
        });

        //adição de funcionalidade (trocar de cena) ao botão
        this.playBt = this.add.image(this.game.config.width / 2 - 50, this.game.config.height / 4 * 3, 'start')
            .setScale(.2).setOrigin(0, 0).setInteractive().setVisible(false);
 
        this.playBt.on('pointerdown', function () {
            if (this.nameFilled) {
                this.game.highScore = 0;
                this.scene.start('JogoPenguim', this.game);
            }
        }, this);            

    }

    //atualização da cena com adição do nome
    updateName(inputNameElement) {
        let name = inputNameElement.getChildByName("name");
        if (name.value != "") {
            this.message.setText("Hello " + name.value);
            this.playBt.setVisible(true);
            this.nameFilled = true;
            this.game.name = name.value;
        }
    }
}


