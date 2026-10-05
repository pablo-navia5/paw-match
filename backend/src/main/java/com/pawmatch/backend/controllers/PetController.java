package com.pawmatch.backend.controllers;

import com.pawmatch.backend.dtos.PetCreateDto;
import com.pawmatch.backend.dtos.PetDto;
import com.pawmatch.backend.facades.PetFacade;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @DeleteMapping("/{petId}")
    public ResponseEntity<Void> deletePet(@PathVariable("petId") Long petId) {
        try {
            petFacade.delete(petId);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<PetDto>> getAllPets() {
        return ResponseEntity.ok(petFacade.findAll());
    }

    @GetMapping("/feed/{userId}")
    public ResponseEntity<List<PetDto>> getUserFeed(@PathVariable Long userId) {
        try {
            List<PetDto> feed = petFacade.getUnseenPetsForUser(userId);
            return ResponseEntity.ok(feed);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/shelter/{shelterId}")
    public ResponseEntity<List<PetDto>> findByShelterId(@PathVariable final Long shelterId) {
        return ResponseEntity.ok(petFacade.findByShelterId(shelterId));
    }
}
