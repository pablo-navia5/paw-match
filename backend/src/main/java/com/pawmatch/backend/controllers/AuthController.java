package com.pawmatch.backend.controllers;

import com.pawmatch.backend.dtos.AuthProfileDto;
import com.pawmatch.backend.facades.ShelterFacade;
import com.pawmatch.backend.facades.UserFacade;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserFacade userFacade;
    private final ShelterFacade shelterFacade;

    @GetMapping("/profile/{firebaseUid}")
    public ResponseEntity<AuthProfileDto> getProfile(@PathVariable final String firebaseUid) {
        var user = userFacade.findByFirebaseUid(firebaseUid);
        if (user.isPresent()) {
            return ResponseEntity.ok(new AuthProfileDto(user.get().getId(), "USER"));
        }

        var shelter = shelterFacade.findByFirebaseUid(firebaseUid);
        return shelter.map(shelterModel -> ResponseEntity.ok(new AuthProfileDto(shelterModel.getId(), "SHELTER"))).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
