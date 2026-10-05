package com.pawmatch.backend.controllers;

import com.pawmatch.backend.dtos.ShelterDto;
import com.pawmatch.backend.dtos.ShelterRegisterDto;
import com.pawmatch.backend.facades.ShelterFacade;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/shelter")
public class ShelterController {

    private final ShelterFacade shelterFacade;

    @PostMapping("/register")
    public ResponseEntity<ShelterDto> registerUser(@RequestBody final ShelterRegisterDto shelterRegisterDto) {
        return ResponseEntity.ok(shelterFacade.registerShelter(shelterRegisterDto));
    }
}
