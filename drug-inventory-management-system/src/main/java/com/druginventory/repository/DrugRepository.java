package com.druginventory.repository;



import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.druginventory.model.Drug;
import com.druginventory.model.Vendor;
@Repository
public interface DrugRepository extends JpaRepository<Drug, Long> {

	List<Drug> findByVendor(Vendor vendor);

	 List<Drug> findByNameAndVendor(String name, Vendor vendor);

	Page<Drug> findByVendor(Vendor vendor, Pageable pageable);
}
