package com.techelevator.repository;

import com.techelevator.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IngredientRepository extends JpaRepository<Ingredient, Integer> {


    @Query(
            value= "SELECT i.* FROM ingredients i " +
            "JOIN ingredients_recipe ir ON ir.ingredients_id = i.ingredients_id " +
            "JOIN recipe r ON r.recipe_id = ir.recipe_id " +
            "where r.recipe_id = ?1 order by i.name DESC",
            nativeQuery = true
    )
    List<Ingredient> findIngredientByRecipeID(Integer id);





}