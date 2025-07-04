package com.druginventory.controller;

import com.druginventory.repository.dto.ApiResponse;
import com.druginventory.repository.dto.DrugDTO;
import com.druginventory.model.Drug;
import com.druginventory.model.Vendor;
import com.druginventory.repository.VendorRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import com.druginventory.service.DrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/drugs")
@CrossOrigin(origins = "http://localhost:3000")
public class DrugController {

    private final DrugService drugService;
    private final VendorRepository vendorRepository;

    @Autowired
    public DrugController(DrugService drugService, VendorRepository vendorRepository) {
        this.drugService = drugService;
        this.vendorRepository = vendorRepository;
    }

    // Get all drugs (with pagination)
    @PreAuthorize("hasRole('USER')")
    @GetMapping
    public ResponseEntity<ApiResponse<List<DrugDTO>>> getAllDrugs(
        @RequestParam(defaultValue = "0") int page, // Default page 0
        @RequestParam(defaultValue = "10") int size  // Default size 10
    ) {
        Pageable pageable = PageRequest.of(page, size);  // Pageable object for pagination
        Page<Drug> drugPage = drugService.getAllDrugs(pageable);

        List<DrugDTO> drugDTOs = drugPage.getContent().stream()
                .map(DrugDTO::fromDrug)
                .collect(Collectors.toList());

        // Build the response with pagination details
        ApiResponse<List<DrugDTO>> response = new ApiResponse<>(
            true,
            "Drugs fetched successfully",
            drugDTOs
        );

        return ResponseEntity.ok(response);
    }

    // Add or update drug (if exists)
    @PreAuthorize("hasRole('VENDOR')")
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<DrugDTO>> addOrUpdateDrug(@RequestBody Drug drug, Authentication authentication) {
        String email = authentication.getName();
        Vendor vendor = vendorRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Vendor not found"));

        drug.setVendor(vendor);

        // Find all drugs by name and vendor
        List<Drug> existingDrugs = drugService.findByNameAndVendor(drug.getName(), vendor);

        if (!existingDrugs.isEmpty()) {
            // If there are multiple drugs, we assume you want to update the first one
            Drug existingDrug = existingDrugs.get(0);  // You can choose a more specific drug if needed

            // Update the existing drug's details
            existingDrug.setCategory(drug.getCategory());
            existingDrug.setForm(drug.getForm());
            existingDrug.setPrice(drug.getPrice());
            existingDrug.setAvailable(drug.getAvailable());
            existingDrug.setQuantity(drug.getQuantity());
            existingDrug.setDescription(drug.getDescription());

            // Save the updated drug
            drugService.saveDrug(existingDrug);

            DrugDTO drugDTO = DrugDTO.fromDrug(existingDrug);
            return ResponseEntity.ok(new ApiResponse<>(true, "Drug updated successfully", drugDTO));
        }

        // If drug does not exist, save it as new
        Drug savedDrug = drugService.saveDrug(drug);
        DrugDTO drugDTO = DrugDTO.fromDrug(savedDrug);

        return ResponseEntity.ok(new ApiResponse<>(true, "Drug added successfully", drugDTO));
    }
    @PreAuthorize("hasRole('VENDOR')")
    @GetMapping("/my-drugs")
    public ResponseEntity<ApiResponse<List<DrugDTO>>> getMyDrugs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication
    ) {
        String email = authentication.getName();
        Vendor vendor = vendorRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Vendor not found"));

        Pageable pageable = PageRequest.of(page, size);
        Page<Drug> drugPage = drugService.findByVendor(vendor, pageable);

        List<DrugDTO> drugDTOs = drugPage.getContent().stream()
                .map(DrugDTO::fromDrug)
                .collect(Collectors.toList());

        ApiResponse<List<DrugDTO>> response = new ApiResponse<>(
                true,
                "Drugs fetched for vendor",
                drugDTOs
        );

        return ResponseEntity.ok(response);
    }

}
