package com.smarthome.server.services;

import com.smarthome.server.models.OtpVerification;
import com.smarthome.server.repository.OtpVerificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class OtpService {

    @Autowired
    private OtpVerificationRepository otpRepository;

    private static final int OTP_EXPIRATION_MINUTES = 10;

    public String generateAndSaveOtp(String email) {
        // Generate a 6 digit OTP
        String otp = String.format("%06d", new Random().nextInt(999999));

        OtpVerification otpVerification = new OtpVerification(
                email,
                otp,
                LocalDateTime.now().plusMinutes(OTP_EXPIRATION_MINUTES));

        otpRepository.save(otpVerification);
        return otp;
    }

    public boolean verifyOtp(String email, String otpStr) {
        Optional<OtpVerification> otpOpt = otpRepository.findTopByEmailOrderByExpiryTimeDesc(email);

        if (otpOpt.isPresent()) {
            OtpVerification otpEntity = otpOpt.get();
            // Check if match, not expired, and not already verified
            if (otpEntity.getOtp().equals(otpStr) &&
                    otpEntity.getExpiryTime().isAfter(LocalDateTime.now()) &&
                    !otpEntity.isVerified()) {

                // Mark as verified
                otpEntity.setVerified(true);
                otpRepository.save(otpEntity);
                return true;
            }
        }
        return false;
    }
}
