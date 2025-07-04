package com.druginventory;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.druginventory.model.Drug;
import com.druginventory.repository.DrugRepository;

@SpringBootApplication
public class DrugInventoryManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(DrugInventoryManagementSystemApplication.class, args);
	}
	
//	 @Bean
//	    CommandLineRunner runner(DrugRepository repo) {
//	        return args -> {
//	            repo.save(Drug.builder().name("Paracetamol").category("Tablet").price(50.0).available(true).build());
//	            repo.save(Drug.builder().name("Cough Syrup").category("Syrup").price(120.0).available(false).build());
//	            repo.save(Drug.builder().name("Insulin").category("Injection").price(250.0).available(true).build());
//	        };
//	    }

}
