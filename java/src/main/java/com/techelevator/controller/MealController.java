package com.techelevator.controller;

import com.techelevator.repository.MealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("meal")
public class MealController {

    @Autowired
    MealRepository mealRepository;

}
