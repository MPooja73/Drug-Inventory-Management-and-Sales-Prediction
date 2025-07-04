package com.druginventory.config;

import com.druginventory.service.CustomUserDetailsService;
import com.druginventory.utility.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableMethodSecurity(prePostEnabled = true)  // Enables @PreAuthorize method security annotations
@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())  // Disable CSRF as we're using JWT
                .cors()  // Ensure CORS is enabled globally
                .and()
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))  // Stateless for JWT
                .authorizeRequests(auth -> auth
                	    .requestMatchers("/auth/**").permitAll()
                	    .requestMatchers("/api/enums/**").permitAll()
                	    .requestMatchers("/api/drugs/add").hasRole("VENDOR")
                	    .requestMatchers("/api/drugs/my-drugs").hasRole("VENDOR")  // ✅ Add this line
                	    .requestMatchers("/api/drugs/**").hasRole("USER")
                	    .requestMatchers("/api/orders/**").permitAll()
                	    .requestMatchers("/vendor/**").hasRole("VENDOR")
                	    .requestMatchers("/user/update-profile/**").hasRole("USER")
                	    .anyRequest().authenticated()
                	)
                .userDetailsService(userDetailsService)  // Custom user details service to load user details
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)  // Add JWT filter before default authentication filter
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();  // Get authentication manager for handling authentication
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Use BCrypt for password encryption
    }
}
