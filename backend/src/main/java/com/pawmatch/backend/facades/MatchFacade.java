package com.pawmatch.backend.facades;

import com.pawmatch.backend.dtos.MatchDto;

import java.util.List;

public interface MatchFacade {

    List<MatchDto> getAllMatchesByShelterId(Long shelterId);

    List<MatchDto> getAllMatchesByUserId(Long userId);

    void updateMatchStatus(Long matchId, String newStatus);
}
