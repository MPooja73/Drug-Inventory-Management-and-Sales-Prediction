package com.druginventory.controller;


import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.druginventory.model.Order;
import com.druginventory.model.User;
import com.druginventory.model.Vendor;
import com.druginventory.repository.OrderRepository;
import com.druginventory.repository.UserRepository;
import com.druginventory.repository.VendorRepository;
import com.druginventory.repository.dto.OrderRequest;
import com.druginventory.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000") // React app URL
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private VendorRepository vendorRepository;

    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest orderRequest) {
        try {
            User user = userRepository.findById(orderRequest.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Order order = orderService.placeOrder(
                    user,
                    orderRequest.getDrugId(),
                    orderRequest.getDrugName(),
                    orderRequest.getQuantity(),
                    orderRequest.getReferenceOrderId(),
                    orderRequest.getDeliveryAddress() // ✅ Pass custom address
            );

            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable Long userId, Principal principal) {
        User loggedInUser = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!loggedInUser.getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }

        return ResponseEntity.ok(orderService.getOrdersByUser(userId));
    }

    
    @PreAuthorize("hasRole('VENDOR')")
    @GetMapping("/vendor/my-orders")
    public ResponseEntity<List<Order>> getOrdersForLoggedInVendor(Principal principal) {
    	System.out.println("Logged-in principal email: " + principal.getName());
    	Vendor loggedInVendor = vendorRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Vendor not found"));

        Long vendorId = loggedInVendor.getId();
        List<Order> orders = orderService.getOrdersForVendor(vendorId);

        return ResponseEntity.ok(orders);
    }
    
//    @PreAuthorize("hasRole('VENDOR')")
//    @GetMapping("/vendor/{vendorId}")
//    public ResponseEntity<List<Order>> getOrdersByVendor(@PathVariable Long vendorId) {
//        return ResponseEntity.ok(orderService.getOrdersForVendor(vendorId));
//    }
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String newStatus = payload.get("status");
        Optional<Order> orderOpt = orderRepository.findById(id);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.setStatus(newStatus);
            orderRepository.save(order);
            return ResponseEntity.ok("Status updated");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
        }
    }
    
//    @PutMapping("/{id}/consume")
//    @PreAuthorize("hasRole('USER')")
//    public ResponseEntity<?> consumeOrder(
//            @PathVariable Long id,
//            @RequestBody Map<String, Integer> payload) {
//        int consumedQty = payload.get("consumedQuantity");
//
//        try {
//            Order updatedOrder = orderService.updateConsumption(id, consumedQty);
//            return ResponseEntity.ok(updatedOrder);
//        } catch (RuntimeException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
    
    @PutMapping("/{id}/consume")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> consumeOrder(@PathVariable Long id, @RequestBody Map<String, Integer> payload, Principal principal) {
        try {
            User loggedInUser = userRepository.findByEmail(principal.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Order order = orderRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Order not found"));

            if (!order.getUser().getId().equals(loggedInUser.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to consume this order.");
            }

            int consumedQuantity = payload.get("consumedQuantity");
            if (consumedQuantity <= 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Consumed quantity must be greater than 0.");
            }

            // Get current consumed quantity, default to 0 if null
            int currentConsumed = order.getConsumedQuantity() != null ? order.getConsumedQuantity() : 0;
            int newTotalConsumed = currentConsumed + consumedQuantity;

            if (newTotalConsumed > order.getQuantity()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Total consumption exceeds ordered quantity.");
            }

            // Set updated consumed quantity
            order.setConsumedQuantity(newTotalConsumed);

            // Mark as fully consumed if needed
            if (newTotalConsumed == order.getQuantity()) {
                order.setFullyConsumed(true);
//                order.setStatus("CONSUMED"); // Optional: update status too
            }

            orderRepository.save(order);

            return ResponseEntity.ok("Order consumption updated to " + newTotalConsumed + " units.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }


    
    }

