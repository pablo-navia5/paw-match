package com.pawmatch.backend.controllers;

import com.pawmatch.backend.dtos.PetCreateDto;
import com.pawmatch.backend.dtos.PetDto;
import com.pawmatch.backend.facades.PetFacade;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/pet")
public class PetController {

    private final PetFacade petFacade;

    @PostMapping("/create")
    public ResponseEntity<PetDto> createPet(@RequestBody final PetCreateDto petCreateDto) {
        return ResponseEntity.ok(petFacade.create(petCreateDto));
    }

    @GetMapping("/shelter/{shelterId}")
    public ResponseEntity<List<PetDto>> findByShelterId(@PathVariable final Long shelterId) {
        return ResponseEntity.ok(petFacade.findByShelterId(shelterId));
    }
}
