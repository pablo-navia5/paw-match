package com.pawmatch.backend.facades.impl;

import com.pawmatch.backend.dtos.InteractionRequestDto;
import com.pawmatch.backend.facades.InteractionFacade;
import com.pawmatch.backend.models.InteractionModel;
import com.pawmatch.backend.services.InteractionService;
import lombok.AllArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class InteractionFacadeImpl implements InteractionFacade {

    private InteractionService interactionService;

    private final Converter<InteractionRequestDto, InteractionModel> toModelConverter;

    @Override
    public void RegisterInteraction(InteractionRequestDto requestDto) {
        interactionService.registerInteraction(toModelConverter.convert(requestDto));
    }
}
