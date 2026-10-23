package com.pawmatch.backend.facades.impl;

import com.pawmatch.backend.dtos.MatchDto;
import com.pawmatch.backend.dtos.PetDto;
import com.pawmatch.backend.dtos.UserDto;
import com.pawmatch.backend.enums.MatchStatus;
import com.pawmatch.backend.facades.MatchFacade;
import com.pawmatch.backend.models.MatchModel;
import com.pawmatch.backend.models.PetModel;
import com.pawmatch.backend.models.UserModel;
import com.pawmatch.backend.services.MatchService;
import com.pawmatch.backend.services.PetService;
import com.pawmatch.backend.services.UserService;
import lombok.AllArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class MatchFacadeImpl implements MatchFacade {

    private final MatchService matchService;
    private final UserService userService;
    private final PetService petService;

    private final Converter<MatchDto, MatchModel> matchtoModelConverter;
    private final Converter<MatchModel, MatchDto> matchtoDtoConverter;
    private final Converter<PetModel, PetDto> petToDtoConverter;
    private final Converter<UserModel, UserDto> usertoDtoConverter;

    @Override
    public List<MatchDto> getAllMatchesByShelterId(Long shelterId) {
        List<MatchModel> matches = matchService.getAllMatcherByShelterId(shelterId);

        return getMatchDtos(matches);
    }

    @Override
    public List<MatchDto> getAllMatchesByUserId(Long userId) {
        List<MatchModel> matches = matchService.getAllMatchesByUserId(userId);

        return getMatchDtos(matches);
    }

    @NonNull
    private List<MatchDto> getMatchDtos(List<MatchModel> matches) {
        return matches.stream().map(match -> {
            UserModel user = userService.findById(match.getUserId()).orElse(null);
            PetModel pet = petService.findById(match.getPetId()).orElse(null);

            UserDto userDto = (user != null) ? usertoDtoConverter.convert(user) : null;
            PetDto petDto = (pet != null) ? petToDtoConverter.convert(pet) : null;

            return MatchDto.builder()
                    .id(match.getId())
                    .userId(match.getUserId())
                    .petId(match.getPetId())
                    .matchPercentage(match.getMatchPercentage())
                    .status(MatchStatus.valueOf(match.getStatus().name()))
                    .createdAt(match.getCreatedAt())
                    .applicant(userDto)
                    .pet(petDto)
                    .build();
        }).collect(Collectors.toList());
    }

    @Override
    public void updateMatchStatus(Long matchId, String newStatus) {
        matchService.updateMatchStatus(matchId, newStatus);
    }
}
