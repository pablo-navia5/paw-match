package com.pawmatch.backend.controllers;

import com.pawmatch.backend.dtos.MatchDto;
import com.pawmatch.backend.facades.MatchFacade;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MatchDto>> getAllMatchesByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(matchFacade.getAllMatchesByUserId(userId));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateStatus(@PathVariable Long id, @RequestParam String status) {
        matchFacade.updateMatchStatus(id, status);
        return ResponseEntity.ok().build();
    }
}
