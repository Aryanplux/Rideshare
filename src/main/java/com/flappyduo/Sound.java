package com.flappyduo;

import javax.sound.sampled.*;

public class Sound {

    public static void playJump() {
        playTone(400, 100, 0.5); // Higher pitch, short
    }

    public static void playScore() {
        playTone(600, 100, 0.3); // Even higher
        new Thread(() -> {
            try { Thread.sleep(100); } catch (Exception e) {}
            playTone(800, 150, 0.4);
        }).start();
    }

    public static void playCrash() {
        playTone(150, 300, 0.6); // Low pitch, longer
    }

    private static void playTone(int hz, int msecs, double vol) {
        new Thread(() -> {
            try {
                float sampleRate = 44100;
                byte[] buf = new byte[1];
                AudioFormat af = new AudioFormat(sampleRate, 8, 1, true, false);
                SourceDataLine sdl = AudioSystem.getSourceDataLine(af);
                sdl.open(af);
                sdl.start();
                
                for (int i = 0; i < msecs * sampleRate / 1000; i++) {
                    double angle = i / (sampleRate / hz) * 2.0 * Math.PI;
                    buf[0] = (byte) (Math.sin(angle) * 127.0 * vol);
                    sdl.write(buf, 0, 1);
                }
                sdl.drain();
                sdl.close();
            } catch (Exception e) {
                // Silent fail if audio unavailable
            }
        }).start();
    }
}
