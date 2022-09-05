package com.techelevator.entity;

import javax.persistence.*;

@Entity
@Table(name = "ingredients")
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredients_id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "tobepurchased", nullable = false)
    private Boolean tobepurchased = false;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getTobepurchased() {
        return tobepurchased;
    }

    public void setTobepurchased(Boolean tobepurchased) {
        this.tobepurchased = tobepurchased;
    }

}