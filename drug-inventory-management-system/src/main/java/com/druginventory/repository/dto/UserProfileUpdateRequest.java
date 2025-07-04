package com.druginventory.repository.dto;

import lombok.Data;

@Data
public class UserProfileUpdateRequest {
    private String name;
    private String phone;
    private String address;
    private String password; 
    
}
