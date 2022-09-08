package com.techelevator.controller;

import com.techelevator.entity.Recipe;
import com.techelevator.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("recipe")
@CrossOrigin(origins = "*")
public class RecipeController {

    @Autowired
    RecipeRepository recipeRepository;

    @GetMapping("meal-{id}")
    public List<Recipe> getRecipeFromMealId(@PathVariable("id") Integer id) {
        return recipeRepository.findRecipeByMealId(id);
    }

    @GetMapping("user-{id}")
    public List<Recipe> getRecipeFromUserId(@PathVariable("id") Integer id) {
        return recipeRepository.findRecipeByUserId(id);
    }

    @GetMapping("{id}")
    public Recipe getRecipeFromId(@PathVariable("id") Integer id) {
        return recipeRepository.findById(id).get();
    }


}
