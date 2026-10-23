package com.pawmatch.backend.services.impl;

import com.pawmatch.backend.daos.MatchDao;
import com.pawmatch.backend.enums.MatchStatus;
import com.pawmatch.backend.models.MatchModel;
import com.pawmatch.backend.services.MatchService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class MatchServiceImpl implements MatchService {

    private final MatchDao matchDao;

    @Override
    public List<MatchModel> getAllMatcherByShelterId(Long shelterId) {
        return matchDao.findAllMatchesByShelter(shelterId);
    }

    @Override
    public List<MatchModel> getAllMatchesByUserId(Long userId) {
        return matchDao.findAllMatchesByUser(userId);
    }

    @Override
    public void updateMatchStatus(Long matchId, String newStatus) {
        MatchModel match = matchDao.findById(matchId)
                                   .orElseThrow(() -> new RuntimeException("Match no encontrado con ID: " + matchId)
                                   );

        match.setStatus(MatchStatus.valueOf(newStatus.toUpperCase()));
        matchDao.save(match);
    }
}
