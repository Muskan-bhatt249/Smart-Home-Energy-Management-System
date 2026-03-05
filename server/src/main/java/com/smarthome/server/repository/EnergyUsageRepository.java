package com.smarthome.server.repository;

import com.smarthome.server.models.EnergyUsage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EnergyUsageRepository extends JpaRepository<EnergyUsage, Long> {
    List<EnergyUsage> findByUserIdAndTimestampAfter(Long userId, LocalDateTime timestamp);

    List<EnergyUsage> findByDeviceId(Long deviceId);
}
