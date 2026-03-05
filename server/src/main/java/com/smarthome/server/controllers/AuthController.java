package com.smarthome.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import com.smarthome.server.models.User;
import com.smarthome.server.payload.request.LoginRequest;
import com.smarthome.server.payload.request.SignupRequest;
import com.smarthome.server.payload.response.JwtResponse;
import com.smarthome.server.payload.response.MessageResponse;
import com.smarthome.server.repository.UserRepository;
import com.smarthome.server.repository.PasswordResetTokenRepository;
import com.smarthome.server.security.jwt.JwtUtils;
import com.smarthome.server.security.services.UserDetailsImpl;
import com.smarthome.server.services.EmailService;
import com.smarthome.server.services.OtpService;
import com.smarthome.server.models.PasswordResetToken;
import com.smarthome.server.payload.request.VerifyOtpRequest;
import com.smarthome.server.payload.request.ForgotPasswordRequest;
import com.smarthome.server.payload.request.ResetPasswordRequest;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    OtpService otpService;

    @Autowired
    EmailService emailService;

    @Autowired
    PasswordResetTokenRepository passwordResetTokenRepository;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        // Authenticate the user credentials first
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Credentials are valid. Now generate and send OTP
        String otp = otpService.generateAndSaveOtp(loginRequest.getEmail());

        try {
            emailService.sendOtpEmail(loginRequest.getEmail(), otp);
            return ResponseEntity.ok(new MessageResponse("OTP sent to your email. Please verify to complete login."));
        } catch (Exception e) {
            // In case email configuration isn't set up yet, we'll return the OTP in the
            // message for testing
            return ResponseEntity.ok(new MessageResponse("Failed to send email. (Testing: Your OTP is " + otp + ")"));
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@Valid @RequestBody VerifyOtpRequest verifyRequest) {
        boolean isValid = otpService.verifyOtp(verifyRequest.getEmail(), verifyRequest.getOtp());

        if (!isValid) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid or expired OTP."));
        }

        // OTP is valid. Generate the JWT.
        Optional<User> userOpt = userRepository.findByEmail(verifyRequest.getEmail());
        if (!userOpt.isPresent()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: User not found."));
        }

        User user = userOpt.get();
        UserDetailsImpl userDetails = UserDetailsImpl.build(user);

        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
                userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtUtils.generateJwtToken(authentication);

        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getEmail()));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (!userOpt.isPresent()) {
            // Return success even if not found to prevent email enumeration
            return ResponseEntity.ok(
                    new MessageResponse("If an account with that email exists, a password reset link has been sent."));
        }

        User user = userOpt.get();
        // Delete any existing tokens for this user
        passwordResetTokenRepository.deleteByUser(user);

        // Create new token
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken(token, user, LocalDateTime.now().plusHours(1));
        passwordResetTokenRepository.save(resetToken);

        try {
            emailService.sendPasswordResetEmail(user.getEmail(), token);
            return ResponseEntity.ok(new MessageResponse("A password reset link has been sent to your email."));
        } catch (Exception e) {
            return ResponseEntity
                    .ok(new MessageResponse("Failed to send email. (Testing: Your reset token is " + token + ")"));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        Optional<PasswordResetToken> tokenOpt = passwordResetTokenRepository.findByToken(request.getToken());

        if (!tokenOpt.isPresent() || tokenOpt.get().getExpiryDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid or expired reset token."));
        }

        User user = tokenOpt.get().getUser();
        user.setPassword(encoder.encode(request.getNewPassword()));
        userRepository.save(user);

        passwordResetTokenRepository.delete(tokenOpt.get());

        return ResponseEntity.ok(new MessageResponse("Password successfully reset! You can now log in."));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getFirstName(),
                signUpRequest.getLastName(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getPhone(),
                signUpRequest.getAddress(),
                signUpRequest.getPrimaryRequirement());

        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
