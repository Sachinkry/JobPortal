package com.example.jobportal.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String location;
    private String skills;
    private String recruiterUsername; // Links job to the recruiter who posted it

    // Constructors
    public Job() {
    }

    public Job(String title, String description, String location, String skills, String recruiterUsername) {
        this.title = title;
        this.description = description;
        this.location = location;
        this.skills = skills;
        this.recruiterUsername = recruiterUsername;
    }

    // Getters and Setters
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getRecruiterUsername() {
        return recruiterUsername;
    }

    public void setRecruiterUsername(String recruiterUsername) {
        this.recruiterUsername = recruiterUsername;
    }
}