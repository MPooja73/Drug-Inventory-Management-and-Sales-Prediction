package com.druginventory.repository.dto;


import com.druginventory.model.Drug;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DrugDTO {
    private Long id;
    private String name;
    private String category;
    private String form;
    private Double price;
    private Boolean available;
    private Integer quantity;
    private String description;
    private String vendorEmail;  // Only email, not full Vendor object
    
    public DrugDTO(Long id, String name, String category, String form, Double price, Boolean available, Integer quantity, String description) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.form = form;
        this.price = price;
        this.available = available;
        this.quantity = quantity;
        this.description = description;
    }

    public static DrugDTO fromDrug(Drug drug) {
        return new DrugDTO(
                drug.getId(),
                drug.getName(),
                drug.getCategory().name(),
                drug.getForm().name(),
                drug.getPrice(),
                drug.getAvailable(),
                drug.getQuantity(),
                drug.getDescription(),
                drug.getVendor().getEmail()
        );
    }
}
