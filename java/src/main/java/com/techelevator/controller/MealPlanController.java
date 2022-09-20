package com.techelevator.controller;

import com.techelevator.dao.UserDao;
import com.techelevator.entity.Meal;
import com.techelevator.entity.MealPlan;
import com.techelevator.model.User;
import com.techelevator.repository.MealPlanRepository;
import com.techelevator.repository.MealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("meal-plan")
@CrossOrigin(origins = "*")
public class MealPlanController {

    @Autowired
    MealPlanRepository mealPlanRepository;
    private UserDao userDao;
    private MealRepository mealRepository;

    public MealPlanController(UserDao userDao, MealRepository mealRepository) {
        this.userDao = userDao;
        this.mealRepository = mealRepository;
    }

    @GetMapping("my-meal-plans")
    public List<MealPlan> getMealPlansFromUser(Principal principal) {
        User user = userDao.findByUsername(principal.getName());
        return mealPlanRepository.findMealPlanByUserId(Math.toIntExact(user.getId()));
    }

    @GetMapping("{id}")
    public MealPlan getMealPlanById(@PathVariable("id")Integer id) {
        return mealPlanRepository.findById(Math.toIntExact(id)).get();
    }

    @PostMapping("{mealPlanId}/add-meal-{mealId}")
    public boolean addMealToMealPlan(
            @PathVariable("mealPlanId") Integer mealPlanId,
            @PathVariable("mealId") Integer mealId) {
        boolean isAdded = false;
        try {
            mealRepository.addMealToMealPlan(mealPlanId, mealId);
            isAdded = true;
        } catch (Exception e) {
            System.out.println(e.getLocalizedMessage());
        }
        return isAdded;
    }

    @DeleteMapping("{mealPlanId}/delete-meal-{mealId}")
    public boolean deleteMealFromMealPlan(
            @PathVariable("mealPlanId") Integer mealPlanId,
            @PathVariable("mealId") Integer mealId) {
        boolean isDeleted = false;
        try {
            mealRepository.deleteMealFromMealPlan(mealPlanId, mealId);
            isDeleted = true;
        } catch (Exception e) {
            System.out.println(e.getLocalizedMessage());
        }
        return isDeleted;
    }

    @PostMapping("add")
    public MealPlan addMealPlan(@Valid @RequestBody MealPlan plan, Principal principal) {
        User user = userDao.findByUsername(principal.getName());
        MealPlan newPlan = mealPlanRepository.save(plan);
        mealPlanRepository.addMealPlanToUser(newPlan.getId(), Math.toIntExact(user.getId()));
        return newPlan;
    }

}
