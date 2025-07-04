package com.druginventory.service;

import com.druginventory.model.User;
import com.druginventory.model.Vendor;
import com.druginventory.repository.UserRepository;
import com.druginventory.repository.VendorRepository;
import com.druginventory.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("Trying to login with email: " + email);  // 👈 Add this debug print
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null) {
            System.out.println("User login detected");
            return new CustomUserDetails(user);
        }

        Vendor vendor = vendorRepository.findByEmail(email).orElse(null);
        if (vendor != null) {
            System.out.println("Vendor login detected");
            return new CustomUserDetails(vendor);
        }

        throw new UsernameNotFoundException("User or Vendor not found with email: " + email);
    }

}
