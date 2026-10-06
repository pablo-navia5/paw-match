package com.pawmatch.backend.services.impl;

import com.pawmatch.backend.daos.MatchDao;
import com.pawmatch.backend.dtos.MatchDto;
import com.pawmatch.backend.facades.MatchFacade;
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
}
