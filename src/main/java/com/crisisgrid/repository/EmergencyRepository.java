package com.crisisgrid.repository;

import com.crisisgrid.entity.Emergency;
import com.crisisgrid.entity.EmergencyStatus;
import com.crisisgrid.entity.EmergencyType;
import com.crisisgrid.entity.Severity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmergencyRepository extends JpaRepository<Emergency, Long> {

    List<Emergency> findByStatus(EmergencyStatus status);

    List<Emergency> findBySeverity(Severity severity);

    List<Emergency> findByEmergencyType(EmergencyType emergencyType);

    List<Emergency> findAllByOrderByPriorityScoreDesc();

    List<Emergency> findByStatusOrderByPriorityScoreDesc(EmergencyStatus status);

    List<Emergency> findBySeverityOrderByPriorityScoreDesc(Severity severity);

    List<Emergency> findByEmergencyTypeOrderByPriorityScoreDesc(EmergencyType emergencyType);
}
