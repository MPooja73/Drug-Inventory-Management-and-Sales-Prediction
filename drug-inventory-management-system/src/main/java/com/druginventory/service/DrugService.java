package com.druginventory.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.druginventory.model.Drug;
import com.druginventory.model.User;
import com.druginventory.model.Vendor;
import com.druginventory.repository.DrugRepository;
import com.druginventory.repository.UserRepository;


import java.util.List;
import java.util.Optional;

@Service
public class DrugService {

    private final DrugRepository drugRepository;
    private final UserRepository userRepository;

    @Autowired
    public DrugService(DrugRepository drugRepository, UserRepository userRepository) {
        this.drugRepository = drugRepository;
        this.userRepository = userRepository;
    }

    public Page<Drug> getAllDrugs(Pageable pageable) {
        return drugRepository.findAll(pageable);  // Paginate using the repository's findAll method
    }

    public List<Drug> findByVendor(Vendor vendor) {
        return drugRepository.findByVendor(vendor);
    }

    public Drug saveDrug(Drug drug) {
        return drugRepository.save(drug); // ✅ Save drug to database
    }

    public List<Drug> findByNameAndVendor(String name, Vendor vendor) {
        return drugRepository.findByNameAndVendor(name, vendor);
    }

	public Page<Drug> findByVendor(Vendor vendor, Pageable pageable) {
	    return drugRepository.findByVendor(vendor, pageable);
	}
	

}
