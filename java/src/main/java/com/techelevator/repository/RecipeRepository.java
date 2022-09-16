package com.techelevator.repository;

import com.techelevator.entity.Recipe;
import com.techelevator.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

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

    @Modifying
    @Transactional
    @Query(
            value="INSERT INTO recipe_users (recipe_id, user_id) VALUES (?1, ?2)",
            nativeQuery = true
    )
    void addRecipeToUser(Integer recipeId, Integer userId);

    @Query(
            value="SELECT r.* FROM recipe r " +
                    "JOIN recipe_users ru ON r.recipe_id = ru.recipe_id " +
                    "WHERE ru.user_id = ?1 " +
                    "ORDER By r.recipe_id ASC",
            nativeQuery=true
    )
    List<Recipe> findRecipeByUserId(Integer id);

    @Modifying
    @Transactional
    @Query(
            value = "INSERT INTO meal_recipe (meal_id, recipe_id) VALUES (?1, ?2)",
            nativeQuery = true
    )
    void addRecipeToMeal(Integer mealId, Integer recipeId);

    @Modifying
    @Transactional
    @Query(
            value = "DELETE FROM meal_recipe " +
                    "WHERE meal_id = ?1 " +
                    "AND recipe_id = ?2",
            nativeQuery = true
    )
    void deleteRecipeFromMeal(Integer mealId, Integer recipeId);



}