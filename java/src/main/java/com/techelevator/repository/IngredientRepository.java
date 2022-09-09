package com.techelevator.repository;

import com.techelevator.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface IngredientRepository extends JpaRepository<Ingredient, Integer> {




    @Query(
            value= "SELECT i.* FROM ingredients i " +
                    "JOIN ingredients_recipe ir ON ir.ingredients_id = i.ingredients_id " +
                    "JOIN recipe r ON r.recipe_id = ir.recipe_id " +
                    "WHERE r.recipe_id = ?1 order by i.name DESC",
            nativeQuery = true
    )
    List<Ingredient> findIngredientByRecipeID(Integer id);

    @Transactional
    @Modifying
    @Query(
            value =     "WITH data (name, tobepurchased, recipe_id, amount) AS (VALUES(?2, ?3, 1, ?4)), " +
        "ins1 AS ( " +
        "INSERT INTO ingredients(name, tobepurchased) "+
        "SELECT name, tobepurchased FROM data "+
        "RETURNING name, tobepurchased, ingredients_id as new_id " +
        ") " +
        "INSERT INTO ingredients_recipe (ingredients_id, recipe_id, amount) " +
        "SELECT ins1.new_id, d.recipe_id, d.amount " +
        "FROM data d " +
        "JOIN ins1 USING (name, tobepurchased) " +
        "WHERE recipe_id = d.recipe_id",
            nativeQuery = true
    )
    void saveToRecipe(Integer recipeId, String name, boolean tobepurchased, double amount);
}

