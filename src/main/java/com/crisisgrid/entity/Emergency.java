package com.crisisgrid.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "emergencies")
public class Emergency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Size(max = 150, message = "Title must not exceed 150 characters")
    @Column(nullable = false, length = 150)
    private String title;

    @NotBlank(message = "Description is required")
    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    @Column(nullable = false, length = 2000)
    private String description;

    @NotNull(message = "Emergency type is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "emergency_type", nullable = false)
    private EmergencyType emergencyType;

    @NotNull(message = "Severity is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Severity severity;

    @NotNull(message = "Latitude is required")
    @DecimalMin(value = "-90.0", message = "Latitude must be between -90 and 90")
    @DecimalMax(value = "90.0", message = "Latitude must be between -90 and 90")
    @Column(nullable = false)
    private Double latitude;

    @NotNull(message = "Longitude is required")
    @DecimalMin(value = "-180.0", message = "Longitude must be between -180 and 180")
    @DecimalMax(value = "180.0", message = "Longitude must be between -180 and 180")
    @Column(nullable = false)
    private Double longitude;

    @NotNull(message = "People affected is required")
    @Min(value = 0, message = "People affected must be at least 0")
    @Column(name = "people_affected", nullable = false)
    private Integer peopleAffected;

    @NotNull(message = "Medical required is required")
    @Column(name = "medical_required", nullable = false)
    private Boolean medicalRequired;

    @NotNull(message = "Required resource is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "required_resource", nullable = false)
    private RequiredResource requiredResource;

    @Column(name = "priority_score")
    private Integer priorityScore;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EmergencyStatus status;

    @Column(name = "reported_at", nullable = false, updatable = false)
    private LocalDateTime reportedAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        if (this.reportedAt == null) {
            this.reportedAt = now;
        }
        this.updatedAt = now;
        if (this.status == null) {
            this.status = EmergencyStatus.REPORTED;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Emergency() {
    }

    public Emergency(Long id, String title, String description, EmergencyType emergencyType,
                     Severity severity, Double latitude, Double longitude, Integer peopleAffected,
                     Boolean medicalRequired, RequiredResource requiredResource, Integer priorityScore,
                     EmergencyStatus status, LocalDateTime reportedAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.emergencyType = emergencyType;
        this.severity = severity;
        this.latitude = latitude;
        this.longitude = longitude;
        this.peopleAffected = peopleAffected;
        this.medicalRequired = medicalRequired;
        this.requiredResource = requiredResource;
        this.priorityScore = priorityScore;
        this.status = status;
        this.reportedAt = reportedAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public EmergencyType getEmergencyType() {
        return emergencyType;
    }

    public void setEmergencyType(EmergencyType emergencyType) {
        this.emergencyType = emergencyType;
    }

    public Severity getSeverity() {
        return severity;
    }

    public void setSeverity(Severity severity) {
        this.severity = severity;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Integer getPeopleAffected() {
        return peopleAffected;
    }

    public void setPeopleAffected(Integer peopleAffected) {
        this.peopleAffected = peopleAffected;
    }

    public Boolean getMedicalRequired() {
        return medicalRequired;
    }

    public void setMedicalRequired(Boolean medicalRequired) {
        this.medicalRequired = medicalRequired;
    }

    public RequiredResource getRequiredResource() {
        return requiredResource;
    }

    public void setRequiredResource(RequiredResource requiredResource) {
        this.requiredResource = requiredResource;
    }

    public Integer getPriorityScore() {
        return priorityScore;
    }

    public void setPriorityScore(Integer priorityScore) {
        this.priorityScore = priorityScore;
    }

    public EmergencyStatus getStatus() {
        return status;
    }

    public void setStatus(EmergencyStatus status) {
        this.status = status;
    }

    public LocalDateTime getReportedAt() {
        return reportedAt;
    }

    public void setReportedAt(LocalDateTime reportedAt) {
        this.reportedAt = reportedAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
