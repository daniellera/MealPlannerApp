package com.techelevator.repository;

import com.techelevator.entity.Ingredient;
import com.techelevator.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {



    @Query(
            value="SELECT r.* FROM recipe r " +
                    "JOIN meal_recipe mr ON r.recipe_id = mr.recipe_id " +
                    "WHERE mr.meal_id = ?1 " +
                    "ORDER BY r.recipe_id DESC" ,
            nativeQuery = true
    )
    List<Recipe> findRecipeByMealId(Integer id);

    @Query(
            value="SELECT r.* FROM recipe r " +
                    "JOIN recipe_users ru ON r.recipe_id = ru.recipe_id " +
                    "WHERE ru.user_id = ?1 " +
                    "ORDER By r.recipe_id ASC",
            nativeQuery=true
    )
    List<Recipe> findRecipeByUserId(Integer id);

}