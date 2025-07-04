package com.druginventory.repository.dto;

import lombok.Data;

@Data
public class OrderRequest {
    private Long userId;
    private Long drugId;
    private String drugName;
    private int quantity;
    private Long referenceOrderId;
    private String deliveryAddress;
    
}