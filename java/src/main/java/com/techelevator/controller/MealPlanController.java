package com.techelevator.controller;

import com.techelevator.entity.Meal;
import com.techelevator.entity.MealPlan;
import com.techelevator.repository.MealPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("meal-plan")
@CrossOrigin(origins = "*")
public class MealPlanController {

    @Autowired
    MealPlanRepository mealPlanRepository;

    @GetMapping("user-{id}")
    public List<MealPlan> getMealPlansFromUser(@PathVariable("id") Integer userId) {
        return mealPlanRepository.findMealPlanByUserId(userId);
    }
}
