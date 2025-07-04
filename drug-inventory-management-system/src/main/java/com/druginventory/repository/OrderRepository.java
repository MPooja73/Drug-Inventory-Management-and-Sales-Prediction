package com.druginventory.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.druginventory.model.Order;
import com.druginventory.model.Vendor;
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
	List<Order> findByUserId(Long userId); 
	List<Order> findByVendor(Vendor vendor); 

    List<Order> findByStatus(String status);
    List<Order> findByVendor_Id(Long vendorId);
}