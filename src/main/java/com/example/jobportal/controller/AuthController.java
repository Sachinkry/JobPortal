package com.example.jobportal.controller;

import com.example.jobportal.model.User;
import com.example.jobportal.service.UserService;
import com.example.jobportal.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/register")
    public ResponseEntity<String> getRegister() {
        return ResponseEntity.status(405)
                .body("Method Not Allowed: Use POST to register a user at /auth/register with a JSON body.");
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody UserRequest userRequest) {
        User user = userService.registerUser(
                userRequest.getUsername(),
                userRequest.getPassword(),
                userRequest.getRole());
        return ResponseEntity.ok(user);
    }

    @GetMapping("/check")
    public ResponseEntity<String> checkAuth() {
        return ResponseEntity.ok("Authentication successful");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        User user = userService.findByUsername(username);
        if (user != null && userService.validatePassword(password, user.getPassword())) {
            String token = jwtUtil.generateToken(username, user.getRole());
            return ResponseEntity.ok(new LoginResponse(username, user.getRole(), token));
        }
        return ResponseEntity.status(401).body(new LoginResponse(null, null, null));
    }
}

class UserRequest {
    private String username;
    private String password;
    private String role;

    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}

class LoginRequest {
    private String username;
    private String password;

    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

class LoginResponse {
    private String username;
    private String role;
    private String token;

    public LoginResponse(String username, String role, String token) {
        this.username = username;
        this.role = role;
        this.token = token;
    }

    // Getters
    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }

    public String getToken() {
        return token;
    }
}