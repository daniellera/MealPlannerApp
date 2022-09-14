package com.techelevator.controller;

import com.techelevator.dao.UserDao;
import com.techelevator.entity.Meal;
import com.techelevator.model.User;
import com.techelevator.repository.MealRepository;
import com.techelevator.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    public MealController(UserDao userDao) {
        this.userDao = userDao;
    }

    @GetMapping("")
    public List<Meal> getAllMeals() {
        return mealRepository.findAll();
    }

    //change getMapping to "my-meals" and use principal
    @GetMapping("my-meals")
    public List<Meal> getMealsFromUser(Principal principal) {
        User user = userDao.findByUsername(principal.getName());
        return mealRepository.findMealByUserId(Math.toIntExact(user.getId()));
    }

    @GetMapping("meal-plan-{id}")
    public List<Meal> getMealsFromMealPlan(@PathVariable("id") Integer mealPlanId) {
        return mealRepository.findMealByMealPlan(mealPlanId);
    }

}
