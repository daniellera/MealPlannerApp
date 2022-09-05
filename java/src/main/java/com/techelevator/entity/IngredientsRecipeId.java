package com.techelevator.entity;

import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class IngredientsRecipeId implements Serializable {
    private static final long serialVersionUID = 4896244177950088981L;
    @Column(name = "ingredients_id", nullable = false)
    private Integer ingredientsId;

    @Column(name = "recipe_id", nullable = false)
    private Integer recipeId;

    public Integer getIngredientsId() {
        return ingredientsId;
    }

    public void setIngredientsId(Integer ingredientsId) {
        this.ingredientsId = ingredientsId;
    }

    public Integer getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Integer recipeId) {
        this.recipeId = recipeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        IngredientsRecipeId entity = (IngredientsRecipeId) o;
        return Objects.equals(this.ingredientsId, entity.ingredientsId) &&
                Objects.equals(this.recipeId, entity.recipeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ingredientsId, recipeId);
    }

}