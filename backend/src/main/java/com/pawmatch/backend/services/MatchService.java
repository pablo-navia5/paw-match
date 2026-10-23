package com.pawmatch.backend.services;

import com.pawmatch.backend.models.MatchModel;

import java.util.List;

public interface MatchService {

    List<MatchModel> getAllMatcherByShelterId(Long shelterId);

    List<MatchModel> getAllMatchesByUserId(Long userId);

    void updateMatchStatus(Long matchId, String newStatus);
}
