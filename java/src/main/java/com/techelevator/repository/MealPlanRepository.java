package com.techelevator.repository;

import com.techelevator.entity.Meal;
import com.techelevator.entity.MealPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MealPlanRepository extends JpaRepository<MealPlan, Integer> {

    @Query(
            value="SELECT mp.* FROM meal_plan mp " +
                    "JOIN users u ON mp.meal_plan_id = u.user_id " +
                    "WHERE u.user_id = ?1 " +
                    "ORDER By mp.meal_plan_id DESC",
            nativeQuery=true
    )
    List<MealPlan> findMealPlanByUserId(Integer id);

    @Query(
            value="SELECT m.* FROM mealplan m " +
                    "JOIN users_meal mu ON m.meal_id = mu.meal_id " +
                    "WHERE mu.user_id = ?1 " +
                    "ORDER By m.meal_id DESC",
            nativeQuery=true
    )
    List<MealPlan> findMealByUserId(Integer id);

    @Modifying
    @Transactional
    @Query(
            value="INSERT INTO meal_plan_users (meal_plan_id, user_id) VALUES (?, ?)",
            nativeQuery = true
    )
    void addMealPlanToUser(Integer mealPlanId, Integer userId);
}