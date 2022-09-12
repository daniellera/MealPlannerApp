package com.techelevator.repository;

import com.techelevator.entity.Meal;
import com.techelevator.entity.MealPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MealPlanRepository extends JpaRepository<MealPlan, Integer> {

    @Query(
            value="SELECT mp.* FROM meal_plan mp " +
                    "JOIN users u ON mp.meal_plan_id = u.user_id " +
                    "WHERE u.user_id = ? " +
                    "ORDER By mp.meal_plan_id DESC",
            nativeQuery=true
    )
    List<MealPlan> findMealPlanByUserId(Integer id);

}