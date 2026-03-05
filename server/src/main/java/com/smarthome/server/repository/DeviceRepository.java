package com.smarthome.server.repository;

import com.smarthome.server.models.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
    List<Device> findByUserId(Long userId);

    Optional<Device> findByIdAndUserId(Long id, Long userId);
}
