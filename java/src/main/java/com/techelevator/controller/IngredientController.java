package com.techelevator.controller;


import com.techelevator.dao.UserDao;
import com.techelevator.entity.Ingredient;
import com.techelevator.entity.Meal;
import com.techelevator.entity.Recipe;
import com.techelevator.model.IngredientNotSavedException;
import com.techelevator.model.User;
import com.techelevator.repository.IngredientRepository;
import com.techelevator.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
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

    @GetMapping("{id}")
    public Ingredient findIngredientById(@PathVariable("id")Integer id) {return ingredientRepository.findById(id).get();}

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
    @PostMapping("add-{recipeId}")
    public Ingredient newIngredient(@Valid @RequestBody Ingredient ingredient, @PathVariable("recipeId") Integer recipeId) {
        Ingredient newIngredient = ingredientRepository.save(ingredient);
        ingredientRepository.putIngredientInRecipe(newIngredient.getId(), recipeId);
        return newIngredient;
    }

    @Transactional
    @PutMapping("{id}/update")
    public Ingredient updateIngredientById(@Valid @RequestBody Ingredient newIngredient, @PathVariable ("id") Integer id) {
        Ingredient oldIngredient = findIngredientById(id);
        oldIngredient.setName(newIngredient.getName());
        oldIngredient.setAmount(newIngredient.getAmount());
        oldIngredient.setTobepurchased(newIngredient.getTobepurchased());

        return ingredientRepository.save(oldIngredient);
    }



    @DeleteMapping("{id}/delete")
    public boolean deleteIngredient(@PathVariable("id") Integer id) {
        boolean isDeleted = false;
        try {
            ingredientRepository.deleteById(id);
            isDeleted = true;
        } catch (Exception e) {
            System.out.println(e.getLocalizedMessage());
        }
        return isDeleted;
    }

}
