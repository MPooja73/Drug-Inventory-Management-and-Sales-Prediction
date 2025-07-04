package com.druginventory.controller;

import com.druginventory.model.Category;
import com.druginventory.model.Form;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/enums")
public class EnumController {

    @GetMapping("/categories")
    public Category[] getCategories() {
        return Category.values();
    }

    @GetMapping("/forms")
    public Form[] getForms() {
        return Form.values();
    }
}
