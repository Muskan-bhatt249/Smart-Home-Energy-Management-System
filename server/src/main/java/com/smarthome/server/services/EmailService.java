package com.smarthome.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("bhattmuskan249@gmail.com"); 
        message.setTo(to);
        message.setSubject("SmartHome - Your Login OTP");
        message.setText("Welcome to SmartHome Dashboard.\n\nYour OTP for login is: " + otp
                + "\n\nThis OTP is valid for 10 minutes.");
        mailSender.send(message);
    }

    public void sendPasswordResetEmail(String to, String token) {

    String resetUrl = "http://localhost:5173/reset-password?token=" + token;

    SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom("bhattmuskan249@gmail.com");   // ADD THIS LINE
    message.setTo(to);
    message.setSubject("SmartHome - Password Reset Request");
    message.setText(
        "You requested a password reset for your SmartHome account.\n\n" +
        "Click the link below to reset your password:\n" +
        resetUrl +
        "\n\nIf you did not request this, please ignore this email."
    );

    mailSender.send(message);
}
}
