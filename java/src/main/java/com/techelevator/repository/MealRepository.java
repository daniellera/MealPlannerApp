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
                    "JOIN meal_users mu ON r.meal_id = mu.meal_id " +
                    "WHERE mu.user_id = 1? " +
                    "ORDER By m.meal_id DESC",
            nativeQuery=true
    )
    List<Meal> findMealByUserId(Integer id);



}