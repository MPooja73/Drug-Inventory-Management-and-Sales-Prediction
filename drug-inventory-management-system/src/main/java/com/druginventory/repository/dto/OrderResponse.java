package com.druginventory.repository.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import com.druginventory.model.Order;

import lombok.Data;
@Data
public class OrderResponse {

    private Long id;
    private String customer;
    private LocalDate date;
    private String status;
    private List<OrderItemResponse> items;
    

  

    // Getters and Setters
}

