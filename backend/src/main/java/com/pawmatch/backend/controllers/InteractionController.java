package com.pawmatch.backend.controllers;

import com.pawmatch.backend.dtos.InteractionRequestDto;
import com.pawmatch.backend.dtos.InteractionResponseDto;
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
    public ResponseEntity<InteractionResponseDto> createInteraction(@RequestBody InteractionRequestDto requestDto) {
        try {
            boolean isMatch = interactionFacade.RegisterInteraction(requestDto);

            InteractionResponseDto response = InteractionResponseDto.builder()
                    .message("Interacción registrada correctamente")
                    .hasMatch(isMatch)
                    .build();

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new InteractionResponseDto(e.getMessage(), false));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new InteractionResponseDto("Error interno del servidor", false));
        }
    }
}
