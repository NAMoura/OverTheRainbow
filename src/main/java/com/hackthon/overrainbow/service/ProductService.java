package com.hackthon.overrainbow.service;

import com.hackthon.overrainbow.model.Product;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class ProductService {

    private Integer incrementId = 1;

    private Map<Integer, Product> db = new HashMap<>(){{

    }};

    public Collection<Product> get() {
        return db.values();
    }

    public Product get(String id) {
        return db.get(id);
    }

    public Product remove(Integer id) {
         return db.remove(id);
    }

    public Product save(String productName, Integer price) {
        Product product = new Product();
        product.setId(incrementId);
        product.setProductName(productName);
        product.setPrice(price);
        db.put(product.getId(), product);
        incrementId ++;

        return product;
    }
}
