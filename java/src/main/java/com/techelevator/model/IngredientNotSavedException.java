package com.techelevator.model;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.EXPECTATION_FAILED)
public class IngredientNotSavedException extends RuntimeException{

    public IngredientNotSavedException() {
        super("Ingredient not saved to recipe, internal error");
    }
}
