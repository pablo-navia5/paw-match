package com.pawmatch.backend.controllers;

import com.pawmatch.backend.dtos.ShelterDto;
import com.pawmatch.backend.dtos.ShelterRegisterDto;
import com.pawmatch.backend.facades.ShelterFacade;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/shelter")
public class ShelterController {

    private final ShelterFacade shelterFacade;

    @PostMapping("/register")
    public ResponseEntity<ShelterDto> registerUser(@RequestBody final ShelterRegisterDto shelterRegisterDto) {
        return ResponseEntity.ok(shelterFacade.registerShelter(shelterRegisterDto));
    }

    @GetMapping("{id}")
    public ResponseEntity<ShelterDto> getShelterById(@PathVariable final Long id) {
        return ResponseEntity.ok(shelterFacade.getShelterById(id).orElse(null));
    }
}
