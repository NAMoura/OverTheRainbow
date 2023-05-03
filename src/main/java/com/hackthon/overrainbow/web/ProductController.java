package com.hackthon.overrainbow.web;

import com.hackthon.overrainbow.model.Product;
import com.hackthon.overrainbow.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;

@RestController
public class ProductController {


    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/")
    public String hello() {
        return "Hello";
    }

    @GetMapping("/products/")
    public Collection<Product> get() {
        return productService.get();
    }


    @DeleteMapping("/products/{id}")
    public void delete(@PathVariable Integer id) {
        Product product = productService.remove(id);
        if (product == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/products/")
    public Product create(@RequestBody @Valid Product product) {
        return productService.save(product.getProductName(), product.getPrice());
    }

}
