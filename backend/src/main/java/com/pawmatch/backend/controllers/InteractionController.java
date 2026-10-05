package com.pawmatch.backend.controllers;

import com.pawmatch.backend.dtos.InteractionRequestDto;
import com.pawmatch.backend.facades.InteractionFacade;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/interaction")
public class InteractionController {

    private final InteractionFacade interactionFacade;

    @PostMapping
    public ResponseEntity<String> createInteraction(@RequestBody InteractionRequestDto requestDto) {
        try {
            interactionFacade.RegisterInteraction(requestDto);
            return ResponseEntity.ok("Interacción registrada correctamente");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error interno del servidor");
        }
    }
}
