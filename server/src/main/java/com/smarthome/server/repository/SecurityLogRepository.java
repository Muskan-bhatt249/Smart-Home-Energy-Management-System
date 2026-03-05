package com.smarthome.server.repository;

import com.smarthome.server.models.SecurityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SecurityLogRepository extends JpaRepository<SecurityLog, Long> {
    List<SecurityLog> findByUserIdOrderByTimestampDesc(Long userId);
}
