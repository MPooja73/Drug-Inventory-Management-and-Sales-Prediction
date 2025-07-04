package com.druginventory.repository.dto;

import lombok.Data;

@Data
public class OrderItemResponse {

    private String drugName;
    private int quantity;

    public OrderItemResponse(OrderItem orderItem) {
        this.drugName = orderItem.getDrug().getName();
        this.quantity = orderItem.getQuantity();
    }

    // Getters and Setters
}

