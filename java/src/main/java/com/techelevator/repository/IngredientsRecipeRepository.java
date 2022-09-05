package com.techelevator.repository;

import com.techelevator.entity.IngredientsRecipe;
import com.techelevator.entity.IngredientsRecipeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IngredientsRecipeRepository extends JpaRepository<IngredientsRecipe, IngredientsRecipeId> {

    @Query("select i from IngredientsRecipe i where i.recipe.id = ?1")
    List<IngredientsRecipe> findIngredientByRecipeId(Integer id);


}