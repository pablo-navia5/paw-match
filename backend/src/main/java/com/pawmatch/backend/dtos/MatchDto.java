package com.pawmatch.backend.dtos;

import com.pawmatch.backend.enums.MatchStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatchDto {
    private Long id;
    private Long userId;
    private Long petId;
    private Double matchPercentage;
    private MatchStatus status;
    private LocalDateTime createdAt;
    private UserDto applicant;
    private PetDto pet;
}
