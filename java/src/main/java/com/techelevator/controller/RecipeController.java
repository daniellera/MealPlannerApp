package com.techelevator.controller;

import com.techelevator.dao.UserDao;
import com.techelevator.entity.Recipe;
import com.techelevator.model.User;
import com.techelevator.repository.IngredientRepository;
import com.techelevator.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("recipe")
@CrossOrigin(origins = "*")
public class RecipeController {
    IngredientRepository ingredientsRepository;

    @Autowired
    RecipeRepository recipeRepository;
    private UserDao userDao;

    public RecipeController(UserDao userDao) {
        this.userDao = userDao;
    }



    @GetMapping("meal-{id}")
    public List<Recipe> getRecipeFromMealId(@PathVariable("id") Integer id) {
        return recipeRepository.findRecipeByMealId(id);
    }

    @GetMapping("my-recipes")
    public List<Recipe> getRecipeFromUser(Principal principal) {
        User user = userDao.findByUsername(principal.getName());
        return recipeRepository.findRecipeByUserId(Math.toIntExact(user.getId()));
    }

    @GetMapping("{id}")
    public Recipe getRecipeFromId(@PathVariable("id") Integer id) {
        return recipeRepository.findById(id).get();
    }

    @PostMapping("add")
    public Recipe updateRecipe(@RequestBody Recipe recipe) {
       return recipeRepository.save(recipe);
    }

    @DeleteMapping("{id}")
    public boolean deleteRecipe(@PathVariable("id") Integer id) {
        boolean isDeleted = false;
        try {
            ingredientsRepository.deleteFromRecipe(id);
            recipeRepository.deleteRecipe(id);
            isDeleted = true;
        } catch (Exception e) {
            System.out.println(e.getLocalizedMessage());
        }
        return isDeleted;
    }


}
