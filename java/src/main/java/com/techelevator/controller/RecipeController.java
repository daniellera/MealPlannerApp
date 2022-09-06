package com.techelevator.controller;

import com.techelevator.entity.Recipe;
import com.techelevator.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("recipe")
public class RecipeController {

    @Autowired
    RecipeRepository recipeRepository;

    @GetMapping("meal-{id}")
    public List<Recipe> getRecipeFromMealId(@PathVariable("id") Integer id) {
        return recipeRepository.findRecipeByMealId(id);
    }


}
