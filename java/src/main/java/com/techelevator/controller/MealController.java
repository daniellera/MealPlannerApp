package com.techelevator.controller;

import com.techelevator.entity.Meal;
import com.techelevator.repository.MealRepository;
import com.techelevator.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("meal")
@CrossOrigin(origins = "*")
public class MealController {

    @Autowired
    MealRepository mealRepository;

    private RecipeRepository recipeRepository;

    @GetMapping("")
    public List<Meal> getAllMeals() {
        return mealRepository.findAll();
    }

    //change getMapping to "my-meals" and use principal
    @GetMapping("user-{id}")
    public List<Meal> getMealsFromUser(@PathVariable("id") Integer userId) {
        return mealRepository.findMealByUserId(userId);
    }

    @GetMapping("meal-plan-{id}")
    public List<Meal> getMealsFromMealPlan(@PathVariable("id") Integer mealPlanId) {
        return mealRepository.findMealByMealPlan(mealPlanId);
    }

}
