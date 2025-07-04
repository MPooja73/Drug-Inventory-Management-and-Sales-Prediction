package com.druginventory.utility;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class JwtUtil {

    private final String SECRET = "secret_key_123"; // store securely

    // Generate JWT with roles as a List of Strings
    public String generateToken(String email, List<String> roles) {
        return Jwts.builder()
                .setSubject(email)
                .claim("roles", roles) // Use roles as List
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
                .signWith(SignatureAlgorithm.HS256, SECRET)
                .compact();
    }

    // Generate Refresh Token with roles
    public String generateRefreshToken(String email, List<String> roles) {
        return Jwts.builder()
                .setSubject(email)
                .claim("roles", roles) // Same here: store roles as List
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 7)) // 7 days
                .signWith(SignatureAlgorithm.HS256, SECRET)
                .compact();
    }

    // Extract email from JWT
    public String extractEmail(String token) {
        return getClaims(token).getSubject();
    }

    // Extract roles (as a List) from JWT
    @SuppressWarnings("unchecked")
    public List<String> extractRoles(String token) {
        Claims claims = getClaims(token);
        return (List<String>) claims.get("roles"); // Correct extraction as List
    }

    // Validate token expiration
    public boolean validateToken(String token) {
        try {
            return !getClaims(token).getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    // Internal method to parse claims from JWT
    private Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody();
    }
}
