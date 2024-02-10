var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    scene:  {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var peixinho;

function preload() { 
    this.load.image('mar', 'assets/bg_azul-escuro.png');
    this.load.image('peixe roxo', 'assets/peixinho_roxo.png');
    this.load.image('concha', 'assets/concha.png');
    this.load.image('logo inteli', 'assets/logo-inteli_branco.png');
    this.load.image('crustaceo', 'assets/crustaceo.png');
    this.load.image('peixe serio', 'assets/peixe_serio.png');


  }
function create () { 
    this.add.image(400, 300,'mar');
    this.add.image(250, 100, 'peixe roxo').setOrigin(1, 0.5).setScale(1.5);
    this.add.image(650, 60, 'concha').setOrigin(0, 0).setScale(1.5);
    this.add.image(650, 500, 'logo inteli').setScale(0.75);
    this.add.image(150, 500, 'crustaceo').setScale(1.75);


    peixinho = this.add.image(400, 300, 'peixe serio');

    peixinho.setFlip(true, false);

  }
function update () {  
    peixinho.x = this.input.x;
    peixinho.y = this.input.y;
  }

