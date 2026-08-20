package com.crisisgrid.service;

import com.crisisgrid.entity.Emergency;
import com.crisisgrid.entity.EmergencyType;
import com.crisisgrid.entity.RequiredResource;
import com.crisisgrid.entity.Severity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class EmergencyPriorityServiceTest {

    private EmergencyPriorityService priorityService;

    @BeforeEach
    void setUp() {
        priorityService = new EmergencyPriorityService();
    }

    @Test
    @DisplayName("CRITICAL emergency should score higher than LOW emergency")
    void testCriticalHigherThanLow() {
        Emergency criticalEmergency = new Emergency();
        criticalEmergency.setSeverity(Severity.CRITICAL);
        criticalEmergency.setEmergencyType(EmergencyType.EARTHQUAKE);
        criticalEmergency.setPeopleAffected(50);
        criticalEmergency.setMedicalRequired(true);

        Emergency lowEmergency = new Emergency();
        lowEmergency.setSeverity(Severity.LOW);
        lowEmergency.setEmergencyType(EmergencyType.OTHER);
        lowEmergency.setPeopleAffected(1);
        lowEmergency.setMedicalRequired(false);

        int criticalScore = priorityService.calculatePriorityScore(criticalEmergency);
        int lowScore = priorityService.calculatePriorityScore(lowEmergency);

        assertTrue(criticalScore > lowScore, "Critical emergency score should be significantly higher than low");
    }

    @Test
    @DisplayName("Medical required flag should increase priority score")
    void testMedicalRequiredIncreasesScore() {
        Emergency withoutMedical = new Emergency();
        withoutMedical.setSeverity(Severity.HIGH);
        withoutMedical.setEmergencyType(EmergencyType.FLOOD);
        withoutMedical.setPeopleAffected(10);
        withoutMedical.setMedicalRequired(false);

        Emergency withMedical = new Emergency();
        withMedical.setSeverity(Severity.HIGH);
        withMedical.setEmergencyType(EmergencyType.FLOOD);
        withMedical.setPeopleAffected(10);
        withMedical.setMedicalRequired(true);

        int scoreWithout = priorityService.calculatePriorityScore(withoutMedical);
        int scoreWith = priorityService.calculatePriorityScore(withMedical);

        assertEquals(15, scoreWith - scoreWithout, "Medical required should add 15 points");
    }

    @Test
    @DisplayName("More affected people should increase priority score")
    void testMorePeopleIncreasesScore() {
        Emergency fewerPeople = new Emergency();
        fewerPeople.setSeverity(Severity.MEDIUM);
        fewerPeople.setEmergencyType(EmergencyType.FIRE);
        fewerPeople.setPeopleAffected(2);
        fewerPeople.setMedicalRequired(false);

        Emergency morePeople = new Emergency();
        morePeople.setSeverity(Severity.MEDIUM);
        morePeople.setEmergencyType(EmergencyType.FIRE);
        morePeople.setPeopleAffected(100);
        morePeople.setMedicalRequired(false);

        int scoreFewer = priorityService.calculatePriorityScore(fewerPeople);
        int scoreMore = priorityService.calculatePriorityScore(morePeople);

        assertTrue(scoreMore > scoreFewer, "More people affected should produce higher score");
    }

    @Test
    @DisplayName("Score should always clamp between 0 and 100")
    void testClampingBetween0And100() {
        Emergency maxEmergency = new Emergency();
        maxEmergency.setSeverity(Severity.CRITICAL);
        maxEmergency.setEmergencyType(EmergencyType.EARTHQUAKE);
        maxEmergency.setPeopleAffected(1000);
        maxEmergency.setMedicalRequired(true);
        maxEmergency.setRequiredResource(RequiredResource.RESCUE_TEAM);

        int maxScore = priorityService.calculatePriorityScore(maxEmergency);
        assertTrue(maxScore <= 100, "Score must not exceed 100");

        Emergency nullEmergency = null;
        int nullScore = priorityService.calculatePriorityScore(nullEmergency);
        assertEquals(0, nullScore, "Null emergency should produce 0 score");
    }
}
