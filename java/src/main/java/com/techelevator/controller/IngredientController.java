package com.techelevator.controller;

import com.techelevator.entity.Ingredient;
import com.techelevator.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("ingredients")
@CrossOrigin(origins = "*")
public class IngredientController {

    @Autowired
    IngredientRepository ingredientRepository;


    @GetMapping("")
    public List<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    @GetMapping("recipe-{id}")
    public List<Ingredient> getIngredientsFromRecipe(@PathVariable("id") Integer recipeId) {
        return ingredientRepository.findIngredientByRecipeID(recipeId);
    }

}
