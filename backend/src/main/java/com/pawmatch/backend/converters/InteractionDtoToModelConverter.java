package com.pawmatch.backend.converters;

import com.pawmatch.backend.dtos.InteractionRequestDto;
import com.pawmatch.backend.enums.InteractionType;
import com.pawmatch.backend.models.InteractionModel;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class InteractionDtoToModelConverter implements Converter<InteractionRequestDto, InteractionModel> {

    @Override
    public InteractionModel convert(final InteractionRequestDto source) {
        InteractionModel interaction = new InteractionModel();
        interaction.setUserId(source.getUserId());
        interaction.setPetId(source.getPetId());
        interaction.setInteractionType(InteractionType.valueOf(source.getInteractionType().toUpperCase()));
        return interaction;
    }
}
