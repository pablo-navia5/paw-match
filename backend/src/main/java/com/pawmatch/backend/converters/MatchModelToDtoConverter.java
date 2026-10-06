package com.pawmatch.backend.converters;

import com.pawmatch.backend.dtos.MatchDto;
import com.pawmatch.backend.models.MatchModel;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class MatchModelToDtoConverter implements Converter<MatchModel, MatchDto> {

    @Override
    public MatchDto convert(MatchModel source) {
        MatchDto match = new MatchDto();
        match.setUserId(source.getUserId());
        match.setPetId(source.getPetId());
        match.setMatchPercentage(source.getMatchPercentage());
        match.setCreatedAt(source.getCreatedAt());
        match.setStatus(source.getStatus());
        return match;
    }
}
