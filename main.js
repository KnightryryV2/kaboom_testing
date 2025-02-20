import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
            let SPEED = 420;
            let speedscore = 0;
            let nodeciscore = 0;
            let yes = 1;
            let e = false;

            kaboom();
            loadBean();

            scene("game", () => {
                let score = 0;
                const scoreLabel = add([
                    text(score),
                    pos(24, 24)
                ]);
                
                const bean = add([
                    sprite("bean"),
                    pos(80, 40),
                    area(),
                    body(),
                ])

                onKeyPress("space", () => {
                    if(bean.isGrounded()){
                        bean.jump();
                    }
                })
                add([
                    rect(width(), 48),
                    pos(0, height() - 48),
                    outline(4),
                    area(),
                    solid(),
                    color(127, 200, 255),
                ]);

                function spawnTree() {
                    
                        add([
                            // the tree components
                            rect(48, rand(24, 64)),
                            area(),
                            outline(4),
                            pos(width(), height() - 48),
                            origin("botleft"),
                            color(255, 180, 255),
                            move(LEFT, SPEED),
                            "tree", // add a tag here
                        ])
                    wait(rand(1, 1.5), () => {
                        spawnTree();
                    });
                }
                bean.onCollide("tree", () => {
                    addKaboom(bean.pos);
                    shake();
                    go("lose"); // go to "lose" scene here
                });
                spawnTree();
                
                onUpdate(() => {
                    score = score + 1 / 120;
                    speedscore = speedscore / 60
                    nodeciscore = Math.trunc(score);
                    scoreLabel.text = "Score: " + nodeciscore;
                    if(yes <= 200) {
                        destroyAll("tree");
                        yes++
                    };
                });
                if(speedscore => 10){
                        SPEED = SPEED * 2;
                        speedscore = 0;
                }
            });
            scene("lose", () => {
                add([
                    text("Game Over"),
                    pos(center()),
                    origin("center"),
                ]);
                add([
                    text("Your Score: " + nodeciscore),
                    pos(80 - 40)
                ]);
                add([
                    text("Retry?"),
                    pos(85 - 40, 100),
                    area(),
                    "retry",
                ]);
                onClick("retry", () => {
                    SPEED = 420
                    speedscore = 0;
                    nodeciscore = 0;
                    yes = 0;
                    go("game");
                })
            });
            go("game");
