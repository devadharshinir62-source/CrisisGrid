package com.crisisgrid.service;

import com.crisisgrid.entity.Emergency;
import org.springframework.stereotype.Service;

@Service
public class EmergencyPriorityService {

    /**
     * Deterministic rule-based calculation for emergency priority score.
     * Evaluates severity, emergency type, people affected, and medical urgency.
     * Returns a clamped score between 0 and 100.
     *
     * Note: Designed as an isolated service component to allow future replacement
     * with an AI/ML based prioritization model.
     *
     * @param emergency The emergency entity to evaluate
     * @return Clamped priority score between 0 and 100
     */
    public int calculatePriorityScore(Emergency emergency) {
        if (emergency == null) {
            return 0;
        }

        int score = 0;

        // 1. Severity weight (Base score: 10 - 40 points)
        if (emergency.getSeverity() != null) {
            score += switch (emergency.getSeverity()) {
                case CRITICAL -> 40;
                case HIGH -> 28;
                case MEDIUM -> 18;
                case LOW -> 10;
            };
        }

        // 2. Emergency Type weight (8 - 20 points)
        if (emergency.getEmergencyType() != null) {
            score += switch (emergency.getEmergencyType()) {
                case EARTHQUAKE, CYCLONE, FLOOD, FIRE, LANDSLIDE -> 20;
                case MEDICAL, ACCIDENT -> 16;
                case OTHER -> 8;
            };
        }

        // 3. Medical Urgency (0 or 15 points)
        if (Boolean.TRUE.equals(emergency.getMedicalRequired())) {
            score += 15;
        }

        // 4. People Affected scaling (0 - 25 points)
        Integer people = emergency.getPeopleAffected();
        if (people != null && people > 0) {
            if (people >= 100) {
                score += 25;
            } else if (people >= 50) {
                score += 20;
            } else if (people >= 20) {
                score += 15;
            } else if (people >= 5) {
                score += 10;
            } else {
                score += 5;
            }
        }

        // Clamp between 0 and 100
        return Math.max(0, Math.min(100, score));
    }
}
