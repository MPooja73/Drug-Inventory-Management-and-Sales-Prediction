package com.druginventory.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "drug", uniqueConstraints = @UniqueConstraint(columnNames = {"name", "vendor_id"}))
public class Drug {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Enumerated(EnumType.STRING)
    private Form form;

    private Double price;
    private Boolean available;
    private Integer quantity;

    @Column(length = 1000) // Optional: allow longer description text
    private String description;

    // Add vendor field to track which vendor added the drug
    @ManyToOne(fetch = FetchType.LAZY) // Lazy loading for better performance
    @JoinColumn(name = "vendor_id", referencedColumnName = "id") // Foreign key to the Vendor table
    private Vendor vendor;  // Assuming you have a Vendor entity or it could be a User entity
}
