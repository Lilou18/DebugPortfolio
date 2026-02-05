import { k } from "./loader.js";
import { gameState } from "./gameState.js";
import { Player } from "./player.js";
import { createWorld } from "./animationManager.js";
import { uiManager } from "./uiManager.js";

k.scene("level", async () => {


    k.onLoad(() => {
        //debug.inspect = true;

        k.setGravity(1400);

        const world = createWorld();

        // Stocker les objets de la map
        const mapObjects = {};

        createFloor();
        createBorders();
        createPlayer();
        //createScore();

        uiManager.initializeMobileControls();

        function createFloor() {
            let floorY = 0.9 * k.height();
            mapObjects.floor = k.add([k.pos(0, floorY), k.area({ shape: new k.Rect(k.vec2(0), k.width(), 100) }), k.body({ isStatic: true }), "floor"]);
        }

        function createBorders() {
            mapObjects.leftWall = k.add([
                k.pos(-10, 0),
                k.area({ shape: new k.Rect(k.vec2(0), 10, k.height()) }),
                k.body({ isStatic: true }),
                "borderLeft",
            ]);

            mapObjects.rightWall = k.add([
                k.pos(k.width(), 0),
                k.area({ shape: new k.Rect(k.vec2(0), 10, k.height()) }),
                k.body({ isStatic: true }),
                "borderRight",
            ]);
        }

        function createPlayer() {
            const player = new Player(k, 0, 0, 400, 670);
            gameState.player = player;
        }

        function createScore() {
            let score = 10;
            let bestScore = 45;
            let scoreUI = k.add([
                k.pos(k.width() * 0.4, 16),   // Top-left corner
                k.fixed(),
                k.z(2),
                k.scale(1),
            ]);

            let scoreBackground = scoreUI.add([
                k.rect(410, 90, { radius: 8 }),
                k.opacity(0.7),
                k.fixed(),
                k.color(8, 45, 103),
                k.outline(4, rgb(0, 255, 255)),
                k.z(1),
                k.anchor("topleft"),
            ]);

            let scoreText = scoreUI.add([
                k.text(`Énergie: ${score}`, { size: 30, font: "orbitron" }),
                k.color(0, 255, 255),
                k.pos(0, 0),
                k.z(2),
                k.anchor("topleft"),
            ]);

            let bestScoreText = scoreUI.add([
                k.text(`TEST`, { size: 30, font: "orbitron" }),
                k.color(0, 255, 255),
                k.pos(0, 40),
                k.z(2),
                k.anchor("topleft"),
            ]);
        }

        k.onDraw(() => {
            k.drawText({
                text: `FPS: ${k.debug.fps()}`,
                pos: k.vec2(10, 10),
                size: 24,
                color: k.rgb(0, 0, 0),
                fixed: true,
            });
        });
    });

});

k.go("level");