# Smart Home Energy Management System

A full-stack web application that allows users to monitor, manage, and control smart home devices while tracking energy consumption through an interactive dashboard. The system provides insights into device usage patterns and energy efficiency, helping users make informed decisions about their energy usage.

---

# Overview

The Smart Home Energy Management System is designed to simulate a modern smart home platform where users can manage connected devices and analyze energy consumption in real time.

The application includes features such as device management, energy analytics, user authentication with OTP verification, and an interactive dashboard that displays device status and energy insights.

This project demonstrates the integration of modern frontend technologies with a robust backend framework and database management system.

---

# Key Features

• Secure user authentication with OTP verification
• Interactive smart home dashboard
• Add, edit, and delete smart devices
• Toggle devices ON/OFF from the dashboard
• Real-time device status monitoring
• Energy consumption tracking
• Energy usage analytics and visualizations
• User profile and settings management
• Persistent database storage for users and devices

---

# Tech Stack

## Frontend

* React.js
* Vite
* JavaScript
* HTML
* CSS

## Backend

* Spring Boot
* Spring Security
* REST APIs
* JWT Authentication

## Database

* H2 Database (Development)
* MySQL (Planned for Production)
* Hibernate ORM
* Spring Data JPA

## Tools

* Visual Studio Code
* Maven
* Git & GitHub
* Postman (API testing)

---

# System Architecture

Frontend (React Dashboard)

↓

REST API Requests

↓

Backend (Spring Boot)

↓

Spring Data JPA + Hibernate

↓

Database (H2 / MySQL)

---

# Application Modules

## Authentication

Users can sign up and log in securely using OTP verification via email.

## Device Management

Users can add new devices, update device information, toggle device states, and remove devices from the system.

## Overview Dashboard

Displays key information including device status, number of active devices, and overall energy usage.

## Energy Monitoring

Tracks energy consumption of connected devices and provides estimated electricity usage.

## Analytics

Visualizes energy consumption patterns and device usage trends using charts.

## User Profile & Settings

Allows users to view and update personal details and customize application settings.

---

# Installation & Setup

## Clone the repository

```bash
git clone https://github.com/yourusername/Smart-Home-Energy-Management-System.git
```

---

## Backend Setup

Navigate to the backend folder:

```bash
cd server
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

Backend will start on:

```
http://localhost:8080
```

---

## Frontend Setup

Navigate to the frontend folder:

```bash
cd smart-home-dashboard
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Frontend will start on:

```
http://localhost:5173
```

---

# Future Improvements

• Integration with real IoT devices
• Advanced energy prediction using machine learning
• Real-time notifications and alerts
• Mobile application support
• Smart automation rules for devices
• Cloud-based deployment

---

# Learning Outcomes

This project helped develop practical skills in:

* Full-stack web development
* REST API design
* Database integration using ORM
* Secure authentication mechanisms
* Dashboard data visualization

---

