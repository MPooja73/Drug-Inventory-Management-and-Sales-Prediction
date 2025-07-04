package com.druginventory.model;



import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Table(name = "orders") 
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // Lazy loading to optimize performance
    @JoinColumn(name = "user_id", nullable = false)
    private User user;// Later you can use proper User entity and relations

    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Vendor vendor;
    private Long drugId;

    private String drugName;

    private int quantity;

    private LocalDateTime orderDate;

    private String status; 
    
    @Column(length = 255)
    private String deliveryAddress;
    
    private Long referenceOrderId;
    @Column(name = "consumed_quantity")
    private Integer consumedQuantity = 0;
    @Column(name = "fully_consumed")
    private Boolean fullyConsumed = false;
    
    
    public boolean isFullyConsumed() {
        return fullyConsumed;
    }
    
    public void setFullyConsumed(boolean fullyConsumed) {
        this.fullyConsumed = fullyConsumed;
    }
    
}
