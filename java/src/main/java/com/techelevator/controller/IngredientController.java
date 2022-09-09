package com.techelevator.controller;

import com.techelevator.entity.Ingredient;
import com.techelevator.model.IngredientNotSavedException;
import com.techelevator.repository.IngredientRepository;
import com.techelevator.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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

//    @PutMapping("recipe-{id}")
//    public Ingredient addIngredientToRecipe(@PathVariable("id") Integer recipeId,
//                                            @Valid @RequestBody Ingredient postIngredient,
//                                            @Valid @RequestBody) {
//        String name = postIngredient.getName();
//        boolean tobepurchased = postIngredient.getTobepurchased();
//        ingredientRepository.saveToRecipe(recipeId, name, tobepurchased, amount);
//
//    }

}
