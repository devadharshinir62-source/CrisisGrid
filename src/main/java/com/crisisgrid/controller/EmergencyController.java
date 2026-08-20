package com.crisisgrid.controller;

import com.crisisgrid.dto.EmergencyStatusUpdateRequest;
import com.crisisgrid.entity.Emergency;
import com.crisisgrid.service.EmergencyService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emergencies")
public class EmergencyController {

    private final EmergencyService emergencyService;

    // Constructor injection
    public EmergencyController(EmergencyService emergencyService) {
        this.emergencyService = emergencyService;
    }

    @GetMapping
    public ResponseEntity<List<Emergency>> getAllEmergencies() {
        List<Emergency> emergencies = emergencyService.getAllEmergencies();
        return ResponseEntity.ok(emergencies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Emergency> getEmergencyById(@PathVariable Long id) {
        Emergency emergency = emergencyService.getEmergencyById(id);
        return ResponseEntity.ok(emergency);
    }

    @PostMapping
    public ResponseEntity<Emergency> createEmergency(@Valid @RequestBody Emergency emergency) {
        Emergency createdEmergency = emergencyService.createEmergency(emergency);
        return new ResponseEntity<>(createdEmergency, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Emergency> updateEmergency(
            @PathVariable Long id,
            @Valid @RequestBody Emergency emergency) {
        Emergency updatedEmergency = emergencyService.updateEmergency(id, emergency);
        return ResponseEntity.ok(updatedEmergency);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Emergency> updateEmergencyStatus(
            @PathVariable Long id,
            @Valid @RequestBody EmergencyStatusUpdateRequest request) {
        Emergency updatedEmergency = emergencyService.updateEmergencyStatus(id, request.getStatus());
        return ResponseEntity.ok(updatedEmergency);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmergency(@PathVariable Long id) {
        emergencyService.deleteEmergency(id);
        return ResponseEntity.noContent().build();
    }
}
