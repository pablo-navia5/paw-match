package com.pawmatch.backend.converters;

import com.pawmatch.backend.dtos.InteractionRequestDto;
import com.pawmatch.backend.models.InteractionModel;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class InteractionModelToDtoConverter implements Converter<InteractionModel, InteractionRequestDto> {

    @Override
    public InteractionRequestDto convert(final InteractionModel source) {
        InteractionRequestDto dto = new InteractionRequestDto();
        dto.setUserId(source.getUserId());
        dto.setPetId(source.getPetId());
        dto.setInteractionType(source.getInteractionType().toString());
        return dto;
    }
}
