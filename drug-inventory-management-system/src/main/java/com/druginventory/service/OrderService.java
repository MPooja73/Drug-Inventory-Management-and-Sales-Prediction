package com.druginventory.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.druginventory.model.Drug;
import com.druginventory.model.Order;
import com.druginventory.model.User;
import com.druginventory.model.Vendor;
import com.druginventory.repository.DrugRepository;
import com.druginventory.repository.OrderRepository;
import com.druginventory.repository.UserRepository;
import com.druginventory.repository.dto.OrderResponse;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private DrugRepository drugRepository; 
    
    @Autowired
    private UserRepository userRepository; 
    
    
    public Order placeOrder(User user, Long drugId, String drugName, int quantity, Long referenceOrderId, String deliveryAddress) {
        Drug drug = drugRepository.findById(drugId)
                .orElseThrow(() -> new RuntimeException("Drug not found"));

        if (drug.getQuantity() < quantity) {
            throw new RuntimeException("Not enough stock available");
        }

        // Reduce stock
        drug.setQuantity(drug.getQuantity() - quantity);
        drugRepository.save(drug);

        // Build new order with delivery address
        Order order = Order.builder()
                .user(user)
                .vendor(drug.getVendor())
                .drugId(drugId)
                .drugName(drugName)
                .quantity(quantity)
                .orderDate(LocalDateTime.now())
                .status("Placed")
                .deliveryAddress(deliveryAddress) // ✅ Store order-specific address
                .referenceOrderId(referenceOrderId)
                .build();

        return orderRepository.save(order);
    }

//    public Order placeOrder(User user, Long drugId, String drugName, int quantity) {
//    	
//        Drug drug = drugRepository.findById(drugId)
//                        .orElseThrow(() -> new RuntimeException("Drug not found"));
//
//        if (drug.getQuantity() < quantity) {
//            throw new RuntimeException("Not enough stock available");
//        }
//
//        drug.setQuantity(drug.getQuantity() - quantity);
//        drugRepository.save(drug);
//
//        Order order = Order.builder()
//                .user(user)
//                .vendorId(drug.getVendor().getId()) // <-- Assuming Drug entity has vendorId
//                .drugId(drugId)
//                .drugName(drugName)
//                .quantity(quantity)
//                .orderDate(LocalDateTime.now())
//                .status("Placed")
//                .build();
//
//        return orderRepository.save(order);
//    }
    public Order placeOrder(User user, Long drugId, String drugName, int quantity) {
        return placeOrder(user, drugId, drugName, quantity, null, user.getAddress()); // fallback to user address
    }

    
  public List<Order> getOrdersForVendor(Long vendorId) {
    return orderRepository.findByVendor_Id(vendorId);
}
  public List<Order> getOrdersForVendor(Vendor vendorId) {
	    return orderRepository.findByVendor(vendorId);
	}
  public List<Order> getOrdersByUser(Long userId) {
      return orderRepository.findByUserId(userId);  // ✅ Make sure this method exists in repository
  }
  
  public Order updateConsumption(Long orderId, int consumedQuantity) {
	    Order order = orderRepository.findById(orderId)
	            .orElseThrow(() -> new RuntimeException("Order not found"));

	    if (!order.getStatus().equalsIgnoreCase("DELIVERED")) {
	        throw new RuntimeException("Consumption can only be updated for delivered orders");
	    }

	    int totalQuantity = order.getQuantity();
	    int currentConsumed = order.getConsumedQuantity() != null ? order.getConsumedQuantity() : 0;

	    if (consumedQuantity <= 0 || currentConsumed + consumedQuantity > totalQuantity) {
	        throw new RuntimeException("Invalid consumption quantity");
	    }

	    order.setConsumedQuantity(currentConsumed + consumedQuantity);
	    return orderRepository.save(order);
	}
  

}
