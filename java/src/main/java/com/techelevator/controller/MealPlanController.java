package com.techelevator.controller;

import com.techelevator.dao.UserDao;
import com.techelevator.entity.Meal;
import com.techelevator.entity.MealPlan;
import com.techelevator.model.User;
import com.techelevator.repository.MealPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("meal-plan")
@CrossOrigin(origins = "*")
public class MealPlanController {

    @Autowired
    MealPlanRepository mealPlanRepository;
    private UserDao userDao;

    public MealPlanController(UserDao userDao) {
        this.userDao = userDao;
    }

    @GetMapping("my-meal-plans")
    public List<MealPlan> getMealPlansFromUser(Principal principal) {
        User user = userDao.findByUsername(principal.getName());
        return mealPlanRepository.findMealPlanByUserId(Math.toIntExact(user.getId()));
    }
}
