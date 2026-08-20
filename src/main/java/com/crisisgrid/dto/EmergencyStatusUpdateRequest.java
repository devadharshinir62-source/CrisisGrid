package com.crisisgrid.dto;

import com.crisisgrid.entity.EmergencyStatus;
import jakarta.validation.constraints.NotNull;

public class EmergencyStatusUpdateRequest {

    @NotNull(message = "Status is required")
    private EmergencyStatus status;

    public EmergencyStatusUpdateRequest() {
    }

    public EmergencyStatusUpdateRequest(EmergencyStatus status) {
        this.status = status;
    }

    public EmergencyStatus getStatus() {
        return status;
    }

    public void setStatus(EmergencyStatus status) {
        this.status = status;
    }
}
