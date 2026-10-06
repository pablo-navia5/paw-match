package com.pawmatch.backend.facades.impl;

import com.pawmatch.backend.dtos.MatchDto;
import com.pawmatch.backend.facades.MatchFacade;
import com.pawmatch.backend.models.MatchModel;
import com.pawmatch.backend.services.MatchService;
import lombok.AllArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
public class MatchFacadeImpl implements MatchFacade {

    private final MatchService matchService;

    private final Converter<MatchDto, MatchModel> toModelConverter;
    private final Converter<MatchModel, MatchDto> toDtoConverter;

    @Override
    public List<MatchDto> getAllMatchesByShelterId(Long shelterId) {
        return matchService.getAllMatcherByShelterId(shelterId)
                           .stream()
                           .map(toDtoConverter::convert)
                           .toList();
    }
}
