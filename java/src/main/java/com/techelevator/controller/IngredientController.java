package com.techelevator.controller;

import com.techelevator.entity.Ingredient;
import com.techelevator.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("ingredients")
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
