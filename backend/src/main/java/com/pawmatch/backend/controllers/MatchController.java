package com.pawmatch.backend.controllers;

import com.pawmatch.backend.dtos.MatchDto;
import com.pawmatch.backend.facades.MatchFacade;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/match")
public class MatchController {

    private final MatchFacade matchFacade;

    @GetMapping("/shelter/{shelterId}")
    public ResponseEntity<List<MatchDto>> getAllMatches(@PathVariable Long shelterId) {
        return ResponseEntity.ok(matchFacade.getAllMatchesByShelterId(shelterId));
    }
}
