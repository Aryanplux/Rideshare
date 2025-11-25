package com.flappyduo;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;
import java.util.Random;

public class GamePanel extends JPanel implements ActionListener, KeyListener {
    
    private static final int WIDTH = 800;
    private static final int HEIGHT = 600;
    private static final int INITIAL_SPAWN_RATE = 100; // Frames
    
    private Timer timer;
    private Bird bird1; // Spacebar
    private Bird bird2; // Up Arrow
    private ArrayList<Pipe> pipes;
    private Random random;
    private int ticks;
    private int currentSpawnRate = INITIAL_SPAWN_RATE;
    
    private boolean running = false;
    private boolean gameOver = false;
    private boolean inMenu = true;
    
    private String player1Name = "Player 1";
    private String player2Name = "Player 2";
    private StringBuilder p1Input = new StringBuilder();
    private StringBuilder p2Input = new StringBuilder();
    private boolean typingP1 = true; // Focus on P1 input initially
    
    private int score1 = 0;
    private int score2 = 0;

    // Tokyo Night Colors
    private static final Color BG_COLOR = new Color(26, 27, 38); // Deep dark blue/black
    private static final Color NEON_PINK = new Color(255, 0, 124);
    private static final Color NEON_CYAN = new Color(0, 255, 255);
    private static final Color TEXT_COLOR = new Color(192, 202, 245);

    // Input state tracking
    private boolean[] keys = new boolean[256];
    private boolean p1JumpReady = true;
    private boolean p2JumpReady = true;

    // Visual effects
    private ArrayList<Particle> particles;
    private int bgScrollX = 0;
    private ArrayList<Point> stars;

    public GamePanel() {
        this.setPreferredSize(new Dimension(WIDTH, HEIGHT));
        this.setBackground(BG_COLOR);
        this.setFocusable(true);
        this.setFocusTraversalKeysEnabled(false); // Fix for TAB key
        this.addKeyListener(this);
        
        // Ensure focus is regained on click
        this.addMouseListener(new MouseAdapter() {
            @Override
            public void mousePressed(MouseEvent e) {
                requestFocusInWindow();
            }
        });
        
        bird1 = new Bird(100, HEIGHT / 2, NEON_PINK, player1Name);
        bird2 = new Bird(100, HEIGHT / 2 + 50, NEON_CYAN, player2Name);
        pipes = new ArrayList<>();
        particles = new ArrayList<>();
        random = new Random();
        
        // Generate stars
        stars = new ArrayList<>();
        for (int i = 0; i < 100; i++) {
            stars.add(new Point(random.nextInt(WIDTH), random.nextInt(HEIGHT)));
        }
        
        timer = new Timer(20, this); // ~50 FPS
        timer.start();
    }

    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);
        Graphics2D g2d = (Graphics2D) g;
        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        drawBackground(g2d);

        if (inMenu) {
            drawMenu(g2d);
        } else {
            drawGame(g2d);
            if (gameOver) {
                drawGameOver(g2d);
            }
        }
    }
    
    private void drawBackground(Graphics2D g2d) {
        // Gradient sky
        GradientPaint gp = new GradientPaint(0, 0, new Color(10, 10, 20), 0, HEIGHT, new Color(30, 20, 40));
        g2d.setPaint(gp);
        g2d.fillRect(0, 0, WIDTH, HEIGHT);
        
        // Stars
        g2d.setColor(Color.WHITE);
        for (Point p : stars) {
            int x = (p.x - bgScrollX / 2) % WIDTH;
            if (x < 0) x += WIDTH;
            g2d.fillRect(x, p.y, 2, 2);
        }
        
        // Cityscape silhouette (procedural)
        g2d.setColor(new Color(10, 10, 15));
        for (int i = 0; i < WIDTH / 50 + 2; i++) {
            int h = Math.abs((i * 137) % 150) + 50;
            int x = (i * 50 - bgScrollX) % (WIDTH + 50);
            if (x < -50) x += WIDTH + 50;
            g2d.fillRect(x, HEIGHT - h, 52, h);
            
            // Windows
            g2d.setColor(new Color(255, 255, 0, 50));
            if (h > 100) {
                g2d.fillRect(x + 10, HEIGHT - h + 20, 10, 10);
                g2d.fillRect(x + 30, HEIGHT - h + 50, 10, 10);
            }
            g2d.setColor(new Color(10, 10, 15));
        }
    }

    private void drawMenu(Graphics2D g2d) {
        g2d.setColor(TEXT_COLOR);
        g2d.setFont(new Font("Consolas", Font.BOLD, 40));
        String title = "FLAPPY DUO: TOKYO NIGHT";
        FontMetrics fm = g2d.getFontMetrics();
        g2d.drawString(title, (WIDTH - fm.stringWidth(title)) / 2, 150);

        g2d.setFont(new Font("Consolas", Font.PLAIN, 20));
        g2d.drawString("Enter Player Names:", (WIDTH - fm.stringWidth("Enter Player Names:")) / 2 - 50, 250);

        // Input boxes
        g2d.setColor(typingP1 ? NEON_PINK : Color.GRAY);
        g2d.drawRect(WIDTH / 2 - 150, 280, 300, 40);
        g2d.setColor(TEXT_COLOR);
        g2d.drawString(p1Input.toString() + (typingP1 ? "|" : ""), WIDTH / 2 - 140, 305);
        g2d.drawString("(Spacebar Player)", WIDTH / 2 + 160, 305);

        g2d.setColor(!typingP1 ? NEON_CYAN : Color.GRAY);
        g2d.drawRect(WIDTH / 2 - 150, 350, 300, 40);
        g2d.setColor(TEXT_COLOR);
        g2d.drawString(p2Input.toString() + (!typingP1 ? "|" : ""), WIDTH / 2 - 140, 375);
        g2d.drawString("(Up Arrow Player)", WIDTH / 2 + 160, 375);

        g2d.setColor(Color.WHITE);
        g2d.drawString("Press ENTER to Start", (WIDTH - fm.stringWidth("Press ENTER to Start")) / 2 - 40, 500);
        g2d.drawString("Press TAB to switch input", (WIDTH - fm.stringWidth("Press TAB to switch input")) / 2 - 50, 530);
    }

    private void drawGame(Graphics2D g2d) {
        for (Pipe pipe : pipes) {
            pipe.draw(g2d);
        }
        
        bird1.draw(g2d);
        bird2.draw(g2d);
        
        for (Particle p : particles) {
            p.draw(g2d);
        }

        // Score
        g2d.setFont(new Font("Consolas", Font.BOLD, 20));
        g2d.setColor(NEON_PINK);
        g2d.drawString(player1Name + ": " + score1, 20, 30);
        g2d.setColor(NEON_CYAN);
        g2d.drawString(player2Name + ": " + score2, 20, 60);
    }

    private void drawGameOver(Graphics2D g2d) {
        g2d.setColor(new Color(0, 0, 0, 150));
        g2d.fillRect(0, 0, WIDTH, HEIGHT);

        g2d.setColor(Color.WHITE);
        g2d.setFont(new Font("Consolas", Font.BOLD, 50));
        String msg = "GAME OVER";
        FontMetrics fm = g2d.getFontMetrics();
        g2d.drawString(msg, (WIDTH - fm.stringWidth(msg)) / 2, HEIGHT / 2 - 50);

        g2d.setFont(new Font("Consolas", Font.PLAIN, 20));
        String sub = "Press ENTER to Restart";
        g2d.drawString(sub, (WIDTH - g2d.getFontMetrics().stringWidth(sub)) / 2, HEIGHT / 2 + 20);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        bgScrollX++; // Always scroll background
        
        if (running && !gameOver) {
            handleInput(); // Poll inputs
            
            ticks++;
            
            // Increase difficulty every 500 ticks (10 seconds)
            if (ticks % 500 == 0) {
                if (Pipe.speed < 12) Pipe.speed++;
                if (currentSpawnRate > 40) currentSpawnRate -= 5;
            }
            
            bird1.update();
            bird2.update();

            // Spawn pipes
            if (ticks % currentSpawnRate == 0) {
                int gapY = random.nextInt(HEIGHT - 250) + 50; // Random gap position
                pipes.add(new Pipe(WIDTH, gapY));
            }

            // Update pipes & cleanup
            for (int i = 0; i < pipes.size(); i++) {
                Pipe pipe = pipes.get(i);
                pipe.update();

                if (pipe.getX() + pipe.getWidth() < 0) {
                    pipes.remove(i);
                    i--;
                }
            }
            
            // Update particles
            for (int i = 0; i < particles.size(); i++) {
                if (!particles.get(i).update()) {
                    particles.remove(i);
                    i--;
                }
            }

            checkCollisions();
            updateScore();
        }
        repaint();
    }
    
    private void handleInput() {
        // Player 1 (Space)
        if (keys[KeyEvent.VK_SPACE]) {
            if (p1JumpReady) {
                bird1.jump();
                spawnParticles(bird1.getBounds().x, bird1.getBounds().y + 10, Color.WHITE, 5);
                p1JumpReady = false; // Require release to jump again
            }
        } else {
            p1JumpReady = true;
        }
        
        // Player 2 (Up Arrow)
        if (keys[KeyEvent.VK_UP]) {
            if (p2JumpReady) {
                bird2.jump();
                spawnParticles(bird2.getBounds().x, bird2.getBounds().y + 10, Color.WHITE, 5);
                p2JumpReady = false; // Require release to jump again
            }
        } else {
            p2JumpReady = true;
        }
    }
    
    private void spawnParticles(int x, int y, Color color, int count) {
        for (int i = 0; i < count; i++) {
            particles.add(new Particle(x, y, color, 20, 3));
        }
    }

    private void checkCollisions() {
        boolean crash = false;
        
        // Floor/Ceiling collision
        if (bird1.getY() + 20 >= HEIGHT || bird1.getY() <= 0) {
            if (!bird1.isDead()) {
                bird1.setDead(true);
                spawnParticles(bird1.getBounds().x, bird1.getBounds().y, NEON_PINK, 20);
                crash = true;
            }
        }
        if (bird2.getY() + 20 >= HEIGHT || bird2.getY() <= 0) {
            if (!bird2.isDead()) {
                bird2.setDead(true);
                spawnParticles(bird2.getBounds().x, bird2.getBounds().y, NEON_CYAN, 20);
                crash = true;
            }
        }

        // Pipe collision
        for (Pipe pipe : pipes) {
            if (pipe.getTopBounds().intersects(bird1.getBounds()) || pipe.getBottomBounds().intersects(bird1.getBounds())) {
                if (!bird1.isDead()) {
                    bird1.setDead(true);
                    spawnParticles(bird1.getBounds().x, bird1.getBounds().y, NEON_PINK, 20);
                    crash = true;
                }
            }
            if (pipe.getTopBounds().intersects(bird2.getBounds()) || pipe.getBottomBounds().intersects(bird2.getBounds())) {
                if (!bird2.isDead()) {
                    bird2.setDead(true);
                    spawnParticles(bird2.getBounds().x, bird2.getBounds().y, NEON_CYAN, 20);
                    crash = true;
                }
            }
        }
        
        if (crash) Sound.playCrash();

        if (bird1.isDead() && bird2.isDead()) {
            gameOver = true;
        }
    }
    
    private void updateScore() {
        for (Pipe pipe : pipes) {
             if (!pipe.isPassed() && pipe.getX() + pipe.getWidth() < 100) {
                 boolean scored = false;
                 if (!bird1.isDead()) { score1++; scored = true; }
                 if (!bird2.isDead()) { score2++; scored = true; }
                 if (scored) Sound.playScore();
                 pipe.setPassed(true);
             }
        }
    }

    private void startGame() {
        if (p1Input.length() > 0) player1Name = p1Input.toString();
        if (p2Input.length() > 0) player2Name = p2Input.toString();
        
        // Re-init birds with names
        bird1 = new Bird(100, HEIGHT / 2, NEON_PINK, player1Name);
        bird2 = new Bird(100, HEIGHT / 2 + 50, NEON_CYAN, player2Name);
        
        pipes.clear();
        particles.clear();
        score1 = 0;
        score2 = 0;
        ticks = 0;
        running = true;
        gameOver = false;
        inMenu = false;
        
        // Reset difficulty
        Pipe.speed = 5;
        currentSpawnRate = INITIAL_SPAWN_RATE;
        
        // Reset jump flags
        p1JumpReady = true;
        p2JumpReady = true;
    }

    private void resetGame() {
        inMenu = true;
        running = false;
        gameOver = false;
        // Don't clear names
    }

    @Override
    public void keyPressed(KeyEvent e) {
        int key = e.getKeyCode();

        if (inMenu) {
            if (key == KeyEvent.VK_ENTER) {
                startGame();
            } else if (key == KeyEvent.VK_TAB) {
                typingP1 = !typingP1;
            } else if (key == KeyEvent.VK_BACK_SPACE) {
                if (typingP1 && p1Input.length() > 0) p1Input.deleteCharAt(p1Input.length() - 1);
                else if (!typingP1 && p2Input.length() > 0) p2Input.deleteCharAt(p2Input.length() - 1);
            } else {
                char c = e.getKeyChar();
                if (Character.isLetterOrDigit(c) || Character.isSpaceChar(c)) {
                     if (typingP1 && p1Input.length() < 10) p1Input.append(c);
                     else if (!typingP1 && p2Input.length() < 10) p2Input.append(c);
                }
            }
        } else {
            if (gameOver) {
                if (key == KeyEvent.VK_ENTER) {
                    resetGame();
                }
            } else {
                // Track key state for game loop
                if (key < keys.length) {
                    keys[key] = true;
                }
            }
        }
    }

    @Override
    public void keyReleased(KeyEvent e) {
        int key = e.getKeyCode();
        if (key < keys.length) {
            keys[key] = false;
        }
    }

    @Override
    public void keyTyped(KeyEvent e) {}
}
