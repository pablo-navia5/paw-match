package com.pawmatch.backend.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/health")
public class HealthController {

    @GetMapping("/awake")
    public String checkStatus() {
        return "PawMatch Backend is awake!";
    }
}
