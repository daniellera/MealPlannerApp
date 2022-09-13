package com.techelevator.repository;

import com.techelevator.entity.Meal;
import com.techelevator.entity.Recipe;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MealRepository extends JpaRepository<Meal, Integer> {

    @Query(
            value="SELECT m.* FROM meal m " +
                    "JOIN users_meal mu ON m.meal_id = mu.meal_id " +
                    "WHERE mu.user_id = ? " +
                    "ORDER By m.meal_id DESC",
            nativeQuery=true
    )
    List<Meal> findMealByUserId(Integer id);

    @Query(
            value="select * from meal m " +
                    "join meal_plan_meal mpm on mpm.meal_id = m.meal_id " +
                    "where mpm.meal_plan_id = ?;",
            nativeQuery = true
    )
    List<Meal> findMealByMealPlan(Integer id);


}