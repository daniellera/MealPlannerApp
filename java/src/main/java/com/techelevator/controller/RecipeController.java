package com.techelevator.controller;

import com.techelevator.dao.UserDao;
import com.techelevator.entity.Recipe;
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
@RequestMapping("recipe")
@CrossOrigin(origins = "*")
public class RecipeController {


    @Autowired
    RecipeRepository recipeRepository;

    private IngredientRepository ingredientRepository;
    private UserDao userDao;

    public RecipeController(UserDao userDao, IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
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

    @Transactional
    @PutMapping("{id}/update")
    public Recipe updateRecipeById(@Valid @RequestBody Recipe newRecipe, @PathVariable("id") Integer id) {
        Recipe oldRecipe = getRecipeFromId(id);
        oldRecipe.setDetails(newRecipe.getDetails());
        oldRecipe.setDishType(newRecipe.getDishType());
        oldRecipe.setInstructions(newRecipe.getInstructions());
        oldRecipe.setIspublic(newRecipe.getIspublic());
        oldRecipe.setTitle(newRecipe.getTitle());
       return recipeRepository.save(oldRecipe);
    }

    @PostMapping("add")
    public Recipe addRecipe(@Valid @RequestBody Recipe recipe, Principal principal) {
        User user = userDao.findByUsername(principal.getName());

        Recipe newRecipe = recipeRepository.save(recipe);
        recipeRepository.addRecipeToUser(newRecipe.getId(), Math.toIntExact(user.getId()));

        return newRecipe;
    }

    @PostMapping("{recipeId}/add-ingredient-{ingredientId}")
    public boolean addIngredientToRecipe(
            @PathVariable("recipeId") Integer recipeId,
            @PathVariable("ingredientId")Integer ingredientId) {
        boolean isAdded = false;
        try {
            ingredientRepository.putIngredientInRecipe(recipeId, ingredientId);
            isAdded = true;
        } catch (Exception e) {
            System.out.println(e.getLocalizedMessage());
        }
        return isAdded;
    }

    @DeleteMapping("{id}/delete")
    public boolean deleteRecipe(@PathVariable("id") Integer id) {
        boolean isDeleted = false;
        try {
            recipeRepository.deleteById(id);
            isDeleted = true;
        } catch (Exception e) {
            System.out.println(e.getLocalizedMessage());
        }
        return isDeleted;
    }


}
