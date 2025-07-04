package com.druginventory.controller;

import com.druginventory.model.User;
import com.druginventory.model.Vendor;
import com.druginventory.repository.UserRepository;
import com.druginventory.repository.VendorRepository;
import com.druginventory.utility.JwtUtil;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins="http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @PostMapping("/user/signup")
    public String registerUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        userRepository.save(user);
        return "User registered successfully";
    }

    @PostMapping("/vendor/signup")
    public String registerVendor(@RequestBody Vendor vendor) {
        vendor.setPassword(passwordEncoder.encode(vendor.getPassword()));
        
        vendorRepository.save(vendor);
        return "Vendor registered successfully";
    }

//    @PostMapping("/login")
//    public String login(@RequestParam String email, @RequestParam String password, @RequestParam String role) {
//        authManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
//        return jwtUtil.generateToken(email, role); // client must pass correct role here
//    }
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
//        String email = loginData.get("email");
//        String password = loginData.get("password");
//        String role = loginData.get("role");
//
//        authManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
//
//        // Fetch user from DB (assuming you have a userService or repository)
//        User user = userRepository.findByEmail(email)
//            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
//
//        String accessToken = jwtUtil.generateToken(email, role);
//        String refreshToken = jwtUtil.generateRefreshToken(email, role);
//
//        Map<String, Object> response = new HashMap<>();
//        response.put("id", user.getId());
//        response.put("name", user.getName());
//        response.put("email", user.getEmail());
//        response.put("role", user.getRoles());
//        response.put("accessToken", accessToken);
//        response.put("refreshToken", refreshToken);
//
//        return ResponseEntity.ok(response);
//    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        // Authenticate user or vendor
        authManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

        // Determine role and fetch user details
        User user = userRepository.findByEmail(email).orElse(null);
        Vendor vendor = vendorRepository.findByEmail(email).orElse(null);

        if (user != null) {
            List<String> roles = List.of("ROLE_USER");
            String accessToken = jwtUtil.generateToken(email, roles);
            String refreshToken = jwtUtil.generateRefreshToken(email, roles);

            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("name", user.getName());
            response.put("email", user.getEmail());
            response.put("role", roles);
            response.put("accessToken", accessToken);
            response.put("refreshToken", refreshToken);

            return ResponseEntity.ok(response);

        } else if (vendor != null) {
            List<String> roles = List.of("ROLE_VENDOR");
            String accessToken = jwtUtil.generateToken(email, roles);
            String refreshToken = jwtUtil.generateRefreshToken(email, roles);

            Map<String, Object> response = new HashMap<>();
            response.put("id", vendor.getId());
            response.put("email", vendor.getEmail());
            response.put("role", roles);
            response.put("accessToken", accessToken);
            response.put("refreshToken", refreshToken);

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }


}
