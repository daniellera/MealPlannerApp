package com.techelevator.controller;

import com.techelevator.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("recipe")
public class RecipeController {

    @Autowired
    RecipeRepository recipeRepository;


}
