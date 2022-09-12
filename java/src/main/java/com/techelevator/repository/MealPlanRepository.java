package com.techelevator.repository;


import com.techelevator.entity.MealPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MealPlanRepository extends JpaRepository<MealPlan, Integer> {

    @Query(
            value="SELECT m.* FROM mealplan m " +
                    "JOIN users_meal mu ON m.meal_id = mu.meal_id " +
                    "WHERE mu.user_id = ? " +
                    "ORDER By m.meal_id DESC",
            nativeQuery=true
    )
    List<MealPlan> findMealByUserId(Integer id);
}