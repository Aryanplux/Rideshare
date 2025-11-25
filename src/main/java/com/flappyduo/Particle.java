package com.flappyduo;

import java.awt.*;

public class Particle {
    private double x, y;
    private double vx, vy;
    private Color color;
    private int life;
    private int maxLife;
    private float size;

    public Particle(int x, int y, Color color, int maxLife, float speed) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.maxLife = maxLife;
        this.life = maxLife;
        this.size = (float) (Math.random() * 5 + 2);
        
        double angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
    }

    public boolean update() {
        x += vx;
        y += vy;
        life--;
        size *= 0.95; // Shrink
        return life > 0;
    }

    public void draw(Graphics2D g2d) {
        float alpha = (float) life / maxLife;
        g2d.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER, alpha));
        g2d.setColor(color);
        g2d.fillOval((int) x, (int) y, (int) size, (int) size);
        g2d.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER, 1.0f));
    }
}
