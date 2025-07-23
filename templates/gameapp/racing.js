const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let car;
let cursors;
let score = 0;
let gameOver = false;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('car', 'https://labs.phaser.io/assets/sprites/car90.png');
    this.load.image('track', 'https://labs.phaser.io/assets/skies/sky4.png');
}

function create() {
    this.add.image(400, 300, 'track');
    car = this.physics.add.sprite(400, 300, 'car');
    car.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (gameOver) return;

    if (cursors.left.isDown) car.angle -= 2;
    if (cursors.right.isDown) car.angle += 2;
    if (cursors.up.isDown) this.physics.velocityFromAngle(car.angle, 200, car.body.velocity);

    // Simulate finish line (example)
    if (car.x > 750) {
        gameOver = true;
        score = Math.floor(Math.random() * 1000); // random score
        submitScore(score);
    }
}

function submitScore(score) {
    fetch('/submit-score/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': csrfToken
        },
        body: `score=${score}`
    })
    .then(res => res.json())
    .then(data => {
        alert("Score submitted: " + score);
    })
    .catch(err => {
        console.error("Failed to submit score", err);
    });
}
