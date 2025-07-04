package com.druginventory.controller;

import com.druginventory.repository.UserRepository;
import com.druginventory.repository.dto.UserProfileUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PutMapping("/update-profile/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateProfile(@PathVariable Long id, @RequestBody UserProfileUpdateRequest updateRequest) {
        return userRepository.findById(id).map(user -> {
            user.setName(updateRequest.getName());
            user.setPhone(updateRequest.getPhone());
            user.setAddress(updateRequest.getAddress());

            if (updateRequest.getPassword() != null && !updateRequest.getPassword().isBlank()) {
                user.setPassword(passwordEncoder.encode(updateRequest.getPassword()));
            }

            userRepository.save(user);
            return ResponseEntity.ok("Profile updated successfully.");
        }).orElse(ResponseEntity.notFound().build());
    }
}
