package com.flappyduo;

import java.awt.*;

public class Bird {
    private int x, y;
    private int velocity;
    private Color color;
    private String name;
    private boolean isDead;
    
    private static final int GRAVITY = 1;
    private static final int JUMP_STRENGTH = -12;
    private static final int SIZE = 20;

    public Bird(int x, int y, Color color, String name) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.name = name;
        this.velocity = 0;
        this.isDead = false;
    }

    private int wingState = 0; // 0: up, 1: mid, 2: down
    private int wingTimer = 0;

    public void update() {
        if (!isDead) {
            velocity += GRAVITY;
            y += velocity;
            
            // Animate wings
            wingTimer++;
            if (wingTimer > 5) {
                wingState = (wingState + 1) % 3;
                wingTimer = 0;
            }
        }
    }

    public void jump() {
        if (!isDead) {
            velocity = JUMP_STRENGTH;
            Sound.playJump(); // Play sound
        }
    }

    public void draw(Graphics2D g2d) {
        if (isDead) {
            g2d.setColor(Color.GRAY);
        } else {
            g2d.setColor(color);
        }
        
        // Gradient body
        if (!isDead) {
            GradientPaint gp = new GradientPaint(x, y, color, x + SIZE, y + SIZE, color.darker());
            g2d.setPaint(gp);
        }
        
        g2d.fillOval(x, y, SIZE, SIZE);
        
        // Glow
        if (!isDead) {
            g2d.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER, 0.3f));
            g2d.setColor(color);
            g2d.fillOval(x - 8, y - 8, SIZE + 16, SIZE + 16);
            g2d.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER, 1.0f));
        }

        // Eye
        g2d.setColor(Color.WHITE);
        g2d.fillOval(x + 12, y + 2, 8, 8);
        g2d.setColor(Color.BLACK);
        g2d.fillOval(x + 16, y + 4, 3, 3);
        
        // Wing
        g2d.setColor(isDead ? Color.DARK_GRAY : color.brighter());
        int wingY = y + 8;
        if (wingState == 0) wingY -= 4;
        else if (wingState == 2) wingY += 4;
        g2d.fillOval(x - 2, wingY, 12, 8);
        
        // Name
        g2d.setColor(Color.WHITE);
        g2d.setFont(new Font("Consolas", Font.BOLD, 12));
        g2d.drawString(name, x - 5, y - 10);
    }

    public Rectangle getBounds() {
        return new Rectangle(x, y, SIZE, SIZE);
    }

    public int getY() {
        return y;
    }
    
    public void setDead(boolean dead) {
        this.isDead = dead;
    }
    
    public boolean isDead() {
        return isDead;
    }
    
    public void reset(int y) {
        this.y = y;
        this.velocity = 0;
        this.isDead = false;
    }
}
