package com.crisisgrid.service;

import com.crisisgrid.entity.Emergency;
import com.crisisgrid.entity.EmergencyStatus;
import com.crisisgrid.exception.ResourceNotFoundException;
import com.crisisgrid.repository.EmergencyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EmergencyService {

    private final EmergencyRepository emergencyRepository;
    private final EmergencyPriorityService priorityService;

    // Constructor injection
    public EmergencyService(EmergencyRepository emergencyRepository, EmergencyPriorityService priorityService) {
        this.emergencyRepository = emergencyRepository;
        this.priorityService = priorityService;
    }

    @Transactional(readOnly = true)
    public List<Emergency> getAllEmergencies() {
        return emergencyRepository.findAllByOrderByPriorityScoreDesc();
    }

    @Transactional(readOnly = true)
    public Emergency getEmergencyById(Long id) {
        return emergencyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Emergency", "id", id));
    }

    public Emergency createEmergency(Emergency emergency) {
        // Automatically calculate priority score
        int score = priorityService.calculatePriorityScore(emergency);
        emergency.setPriorityScore(score);

        if (emergency.getStatus() == null) {
            emergency.setStatus(EmergencyStatus.REPORTED);
        }

        return emergencyRepository.save(emergency);
    }

    public Emergency updateEmergency(Long id, Emergency emergencyDetails) {
        Emergency existing = getEmergencyById(id);

        existing.setTitle(emergencyDetails.getTitle());
        existing.setDescription(emergencyDetails.getDescription());
        existing.setEmergencyType(emergencyDetails.getEmergencyType());
        existing.setSeverity(emergencyDetails.getSeverity());
        existing.setLatitude(emergencyDetails.getLatitude());
        existing.setLongitude(emergencyDetails.getLongitude());
        existing.setPeopleAffected(emergencyDetails.getPeopleAffected());
        existing.setMedicalRequired(emergencyDetails.getMedicalRequired());
        existing.setRequiredResource(emergencyDetails.getRequiredResource());

        if (emergencyDetails.getStatus() != null) {
            existing.setStatus(emergencyDetails.getStatus());
        }

        // Recalculate priority score on update
        int score = priorityService.calculatePriorityScore(existing);
        existing.setPriorityScore(score);

        return emergencyRepository.save(existing);
    }

    public void deleteEmergency(Long id) {
        Emergency existing = getEmergencyById(id);
        emergencyRepository.delete(existing);
    }

    public Emergency updateEmergencyStatus(Long id, EmergencyStatus status) {
        Emergency existing = getEmergencyById(id);
        existing.setStatus(status);
        return emergencyRepository.save(existing);
    }
}
