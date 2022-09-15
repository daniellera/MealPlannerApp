package com.techelevator.controller;


import com.techelevator.dao.UserDao;
import com.techelevator.entity.Ingredient;
import com.techelevator.model.IngredientNotSavedException;
import com.techelevator.model.User;
import com.techelevator.repository.IngredientRepository;
import com.techelevator.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("ingredients")
@CrossOrigin(origins = "*")
public class IngredientController {

    @Autowired
    IngredientRepository ingredientRepository;
    private UserDao userDao;

    public IngredientController(UserDao userDao) {
        this.userDao = userDao;
    }

    @GetMapping("")
    public List<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    @GetMapping("recipe-{id}")
    public List<Ingredient> getIngredientsFromRecipe(@PathVariable("id") Integer recipeId) {
        return ingredientRepository.findIngredientByRecipeID(recipeId);
    }
    @GetMapping("groceryList")
    public List<Ingredient> getGroceryList(Principal principal) {
        User user = userDao.findByUsername(principal.getName());
        return ingredientRepository.getGroceryList(Math.toIntExact(user.getId()));
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
