
document.addEventListener('DOMContentLoaded', () => {
    // Game data
    const games = [
        {
            id: 1,
            title: "Ping Pong Game",
            description: "Classic arcade-style ping pong game with adjustable difficulty",
            image: "../assets/images/pingpong.jpg",
            technologies: ["JavaScript", "HTML Canvas", "CSS3"],
            playLink: "/games/Ping-Pong-Game/",
            codeLink: "https://github.com/yourusername/ping-pong-game",
            leaderboard: [
                { name: "Player1", score: 358 },
                { name: "Player2", score: 302 },
                { name: "Player3", score: 275 },
            ],
            technicalDetails: `
                <h3>Game Development with HTML Canvas</h3>
                <p>This game utilizes the HTML5 Canvas API to create a dynamic 2D rendering context where all game elements are drawn and animated.</p>
                <h4>Key Technical Features:</h4>
                <ul>
                    <li>Animation loop using requestAnimationFrame for smooth gameplay</li>
                    <li>Collision detection algorithms for ball-paddle interaction</li>
                    <li>Physics simulation for ball movement and bouncing</li>
                    <li>Score tracking and game state management</li>
                </ul>
                <h4>Sample Code:</h4>
                <pre>
// Animation loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update positions
    updateBall();
    updatePaddles();
    
    // Check for collisions
    checkCollisions();
    
    // Draw everything
    drawBall();
    drawPaddles();
    drawScore();
    
    // Continue the loop
    requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);
                </pre>
            `
        },
        {
            id: 2,
            title: "Snake Game",
            description: "The classic Snake game with modern graphics and power-ups",
            image: "../assets/images/snake.jpg",
            technologies: ["JavaScript", "HTML Canvas", "Local Storage"],
            playLink: "/games/Snake-Game/",
            codeLink: "https://github.com/yourusername/snake-game",
            leaderboard: [
                { name: "Player1", score: 127 },
                { name: "Player2", score: 105 },
                { name: "Player3", score: 98 },
            ],
            technicalDetails: `
                <h3>Building a Snake Game with Grid-Based Movement</h3>
                <p>This Snake game uses a grid-based movement system and HTML5 Canvas for rendering.</p>
                <h4>Key Technical Features:</h4>
                <ul>
                    <li>Grid-based collision detection</li>
                    <li>Array manipulation for snake body segments</li>
                    <li>Local Storage API for persistent leaderboards</li>
                    <li>Responsive design that adapts to different screen sizes</li>
                </ul>
                <h4>Sample Code:</h4>
                <pre>
// Move the snake
function moveSnake() {
    // Create new head based on current direction
    const head = {x: snake[0].x, y: snake[0].y};
    
    switch(direction) {
        case 'UP': head.y--; break;
        case 'DOWN': head.y++; break;
        case 'LEFT': head.x--; break;
        case 'RIGHT': head.x++; break;
    }
    
    // Add new head to beginning of snake array
    snake.unshift(head);
    
    // Check if we've eaten the food
    if(head.x === food.x && head.y === food.y) {
        // Generate new food location
        generateFood();
        // Increase score
        score += 10;
        // Don't remove tail (snake grows)
    } else {
        // Remove tail segment (snake stays same length)
        snake.pop();
    }
}
                </pre>
            `
        },
        {
            id: 3,
            title: "Tetris Challenge",
            description: "Modern implementation of the classic Tetris game",
            image: "../assets/images/tetris.jpg",
            technologies: ["JavaScript", "CSS Grid", "Web Audio API"],
            playLink: "/games/Tetris-Game/",
            codeLink: "https://github.com/yourusername/tetris-game",
            leaderboard: [
                { name: "Player1", score: 5320 },
                { name: "Player2", score: 4890 },
                { name: "Player3", score: 4570 },
            ],
            technicalDetails: `
                <h3>Tetris Implementation with Matrix Transformations</h3>
                <p>This Tetris game uses matrix operations for piece rotation and collision detection.</p>
                <h4>Key Technical Features:</h4>
                <ul>
                    <li>Matrix rotation algorithms for tetromino pieces</li>
                    <li>CSS Grid for game board rendering</li>
                    <li>Web Audio API for sound effects and music</li>
                    <li>Level progression with increasing difficulty</li>
                </ul>
                <h4>Sample Code:</h4>
                <pre>
// Rotate a tetromino piece
function rotatePiece(piece) {
    // Create a new rotated matrix
    const newPiece = [];
    for(let i = 0; i < piece[0].length; i++) {
        const newRow = [];
        for(let j = piece.length - 1; j >= 0; j--) {
            newRow.push(piece[j][i]);
        }
        newPiece.push(newRow);
    }
    
    // Check if rotation is valid (no collisions)
    if(!checkCollision(newPiece, currentPosition)) {
        return newPiece;
    }
    
    // Return original piece if rotation causes collision
    return piece;
}
                </pre>
            `
        }
    ];

    // Populate game cards
    const gamesGrid = document.querySelector('.games-grid');
    if (gamesGrid) {
        games.forEach(game => {
            const gameCard = `
                <div class="game-card">
                    <div class="game-img">
                        <img src="${game.image}" alt="${game.title}">
                    </div>
                    <div class="game-content">
                        <h3>${game.title}</h3>
                        <p>${game.description}</p>
                        <div class="game-tech">
                            ${game.technologies.map(tech => `<span>${tech}</span>`).join('')}
                        </div>
                        <div class="game-links">
                            <a href="${game.playLink}" class="play-btn"><i class="fas fa-play"></i> Play Now</a>
                            <a href="${game.codeLink}" class="code-btn" target="_blank"><i class="fas fa-code"></i> View Code</a>
                        </div>
                    </div>
                </div>
            `;
            gamesGrid.innerHTML += gameCard;
        });
    }

    // Leaderboard functionality
    const leaderboardTabs = document.querySelector('.leaderboard-tabs');
    const leaderboardContent = document.querySelector('.leaderboard-content');
    
    if (leaderboardTabs && leaderboardContent) {
        // Create tabs
        games.forEach((game, index) => {
            const tab = document.createElement('div');
            tab.className = `leaderboard-tab ${index === 0 ? 'active' : ''}`;
            tab.textContent = game.title;
            tab.dataset.gameId = game.id;
            leaderboardTabs.appendChild(tab);
            
            // Add click event for tabs
            tab.addEventListener('click', () => {
                document.querySelectorAll('.leaderboard-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                updateLeaderboard(game.id);
            });
        });
        
        // Show initial leaderboard
        updateLeaderboard(games[0].id);
    }
    
    function updateLeaderboard(gameId) {
        const game = games.find(g => g.id === gameId);
        if (game && leaderboardContent) {
            leaderboardContent.innerHTML = `
                <h3>${game.title} Top Scores</h3>
                <table class="leaderboard-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Player</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${game.leaderboard.map((entry, index) => `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${entry.name}</td>
                                <td>${entry.score}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }
    }

    // Technical insights functionality
    const techTabs = document.querySelector('.tech-tabs');
    const techContent = document.querySelector('.tech-content');
    
    if (techTabs && techContent) {
        // Create tabs
        games.forEach((game, index) => {
            const tab = document.createElement('div');
            tab.className = `tech-tab ${index === 0 ? 'active' : ''}`;
            tab.textContent = game.title;
            tab.dataset.gameId = game.id;
            techTabs.appendChild(tab);
            
            // Add click event for tabs
            tab.addEventListener('click', () => {
                document.querySelectorAll('.tech-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                updateTechContent(game.id);
            });
        });
        
        // Show initial tech content
        updateTechContent(games[0].id);
    }
    
    function updateTechContent(gameId) {
        const game = games.find(g => g.id === gameId);
        if (game && techContent) {
            techContent.innerHTML = game.technicalDetails;
        }
    }
});