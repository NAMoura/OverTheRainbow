package com.hackthon.overrainbow.model;


import jakarta.validation.constraints.NotEmpty;

;

public class Product {

    private Integer id;

    @NotEmpty
    private String productName;
    private Integer price;


    public Product() {
    }

    public Product(Integer id, String productName, Integer price) {
        this.id = id;
        this.productName = productName;
        this.price = price;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }
}
