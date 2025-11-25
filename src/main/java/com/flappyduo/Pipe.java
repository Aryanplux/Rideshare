package com.flappyduo;

import java.awt.*;

public class Pipe {
    private int x;
    private int gapY;
    private int width = 50;
    private int gapHeight = 150;
    private boolean passed = false;
    
    // Tokyo Night colors
    private static final Color PIPE_COLOR = new Color(40, 40, 40); // Dark Grey
    private static final Color PIPE_BORDER = new Color(169, 177, 214); // Light Grey/Blueish
    
    public static int speed = 5;

    public Pipe(int x, int gapY) {
        this.x = x;
        this.gapY = gapY;
    }

    public void update() {
        x -= speed; // Dynamic speed
    }

    public void draw(Graphics2D g2d) {
        // Gradient for neon effect
        GradientPaint gp = new GradientPaint(x, 0, PIPE_COLOR, x + width, 0, PIPE_COLOR.darker());
        g2d.setPaint(gp);
        
        // Top pipe
        g2d.fillRect(x, 0, width, gapY);
        // Bottom pipe
        g2d.fillRect(x, gapY + gapHeight, width, 800 - (gapY + gapHeight));
        
        // Neon Borders
        g2d.setColor(PIPE_BORDER);
        g2d.setStroke(new BasicStroke(3));
        g2d.drawRect(x, 0, width, gapY);
        g2d.drawRect(x, gapY + gapHeight, width, 800);
        
        // Inner glow line
        g2d.setColor(new Color(255, 255, 255, 50));
        g2d.setStroke(new BasicStroke(1));
        g2d.drawLine(x + 5, 0, x + 5, gapY);
        g2d.drawLine(x + 5, gapY + gapHeight, x + 5, 800);
    }

    public Rectangle getTopBounds() {
        return new Rectangle(x, 0, width, gapY);
    }

    public Rectangle getBottomBounds() {
        return new Rectangle(x, gapY + gapHeight, width, 2000); // Large height to ensure coverage
    }

    public int getX() {
        return x;
    }

    public int getWidth() {
        return width;
    }

    public boolean isPassed() {
        return passed;
    }

    public void setPassed(boolean passed) {
        this.passed = passed;
    }
}
