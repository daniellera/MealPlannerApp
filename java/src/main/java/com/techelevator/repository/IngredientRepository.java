package com.techelevator.repository;

import com.techelevator.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface IngredientRepository extends JpaRepository<Ingredient, Integer> {




    @Query(
            value= "SELECT i.* FROM ingredients i " +
                    "JOIN ingredients_recipe ir ON ir.ingredients_id = i.ingredients_id " +
                    "JOIN recipe r ON r.recipe_id = ir.recipe_id " +
                    "WHERE r.recipe_id = ?1 order by i.name DESC",
            nativeQuery = true
    )
    List<Ingredient> findIngredientByRecipeID(Integer id);

    @Query(
            value = "SELECT * from ingredients " +
            "JOIN ingredients_recipe USING (ingredients_id) " +
            "JOIN recipe using (recipe_id) " +
            "JOIN recipe_users using (recipe_id) " +
            "JOIN users using (user_id) " +
            "WHERE user_id = ?1 and tobepurchased = true",
            nativeQuery = true
    )
    List<Ingredient> getGroceryList(Integer userId);

    @Modifying
    @Query(
            value="DELETE from ingredients" +
                    "JOIN ingredients_recipe USING (ingredients_id) " +
                    "JOIN recipe using (recipe_id) " +
                    "where recipe_id = 1?",
            nativeQuery = true
    )
    void deleteFromRecipe(Integer recipeId);



    @Modifying
    @Query(
            value= "INSERT into ingredients_recipe (recipe_id, ingredients_id) VALUES (1?, 2?)", nativeQuery = true
    )
    void putIngredientInRecipe(Integer recipeId, Integer ingredientId);
}

