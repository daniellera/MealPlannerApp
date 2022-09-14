package com.techelevator.controller;

import com.techelevator.dao.UserDao;
import com.techelevator.entity.Meal;
import com.techelevator.entity.Recipe;
import com.techelevator.model.User;
import com.techelevator.repository.MealRepository;
import com.techelevator.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("meal")
@CrossOrigin(origins = "*")
public class MealController {

    @Autowired
    MealRepository mealRepository;

    private RecipeRepository recipeRepository;
    private UserDao userDao;

    public MealController(UserDao userDao, RecipeRepository recipeRepository) {
        this.userDao = userDao;
        this.recipeRepository = recipeRepository;
    }

    @GetMapping("")
    public List<Meal> getAllMeals() {
        return mealRepository.findAll();
    }

    @GetMapping("{id}")
    public Meal getMealFromId(@PathVariable("id") Integer id) {
        return mealRepository.findById(id).get();
    }

    @GetMapping("my-meals")
    public List<Meal> getMealsFromUser(Principal principal) {
        User user = userDao.findByUsername(principal.getName());
        return mealRepository.findMealsByUserId(Math.toIntExact(user.getId()));
    }

    @GetMapping("meal-plan-{id}")
    public List<Meal> getMealsFromMealPlan(@PathVariable("id") Integer mealPlanId) {
        return mealRepository.findMealByMealPlan(mealPlanId);
    }

    @Transactional
    @PutMapping("{id}/update")
    public Meal updateMealById(@Valid @RequestBody Meal newMeal, @PathVariable("id") Integer id) {
        Meal oldMeal = getMealFromId(id);
        oldMeal.setDescription(newMeal.getDescription());
        oldMeal.setTitle(newMeal.getTitle());
        return mealRepository.save(oldMeal);
    }

    @PostMapping("add")
    public Meal addMeal(@Valid @RequestBody Meal meal, Principal principal) {
        User user = userDao.findByUsername(principal.getName());

        Meal newMeal = mealRepository.save(meal);
        mealRepository.addMealToUser(newMeal.getId(), Math.toIntExact(user.getId()));

        return newMeal;
    }

    @PostMapping("{mealId}/add-recipe-{recipeId}")
    public boolean addRecipeToMeal(
            @PathVariable("mealId") Integer mealId,
            @PathVariable("recipeId") Integer recipeId) {
        boolean isAdded = false;
        try {
            recipeRepository.addRecipeToMeal(mealId, recipeId);
            isAdded = true;
        } catch (Exception e) {
            System.out.println(e.getLocalizedMessage());
        }
        return isAdded;
    }

    @DeleteMapping("{mealId}/delete-recipe-{recipeId}")
    public boolean deleteRecipeFromMeal(
            @PathVariable("mealId") Integer mealId,
            @PathVariable("recipeId") Integer recipeId) {
        boolean isDeleted = false;
        try {
            recipeRepository.deleteRecipeFromMeal(mealId, recipeId);
            isDeleted = true;
        } catch (Exception e) {
            System.out.println(e.getLocalizedMessage());
        }
        return isDeleted;
    }
}
