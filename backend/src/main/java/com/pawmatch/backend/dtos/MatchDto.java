package com.pawmatch.backend.dtos;

import com.pawmatch.backend.enums.MatchStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MatchDto {
    private Long id;
    private Long userId;
    private Long petId;
    private Double matchPercentage;
    private MatchStatus status;
    private LocalDateTime createdAt;
}
