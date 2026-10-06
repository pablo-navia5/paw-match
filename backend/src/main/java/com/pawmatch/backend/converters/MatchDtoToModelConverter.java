package com.pawmatch.backend.converters;

import com.pawmatch.backend.dtos.MatchDto;
import com.pawmatch.backend.models.MatchModel;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class MatchDtoToModelConverter implements Converter<MatchDto, MatchModel> {

    @Override
    public MatchModel convert(final MatchDto source) {
        MatchModel match = new MatchModel();
        match.setUserId(source.getUserId());
        match.setPetId(source.getPetId());
        match.setMatchPercentage(source.getMatchPercentage());
        match.setStatus(source.getStatus());
        match.setCreatedAt(source.getCreatedAt());
        return match;
    }
}
