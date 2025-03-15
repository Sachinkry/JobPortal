package com.example.jobportal.controller;

import com.example.jobportal.model.Job;
import com.example.jobportal.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping("/add")
    public ResponseEntity<Job> addJob(@RequestBody Job job) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        job.setRecruiterUsername(username);
        Job savedJob = jobService.addJob(job);
        return ResponseEntity.ok(savedJob);
    }

    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        List<Job> jobs = jobService.getAllJobs();
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        Job job = jobService.getJobById(id);
        if (job == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(job);
    }

    @GetMapping("/my-jobs")
    public ResponseEntity<List<Job>> getMyJobs() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<Job> jobs = jobService.getJobsByRecruiter(username);
        return ResponseEntity.ok(jobs);
    }

    @PostMapping("/apply")
    @PreAuthorize("isAuthenticated()") // Requires authentication
    public ResponseEntity<String> applyForJob(@RequestParam Long jobId, @RequestParam String username) {
        // Logic to handle job application (e.g., save to database)
        return ResponseEntity.ok("Application submitted for job ID: " + jobId + " by " + username);
    }
}