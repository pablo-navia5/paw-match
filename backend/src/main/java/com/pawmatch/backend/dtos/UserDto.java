package com.pawmatch.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {

    private Long id;
    private String name;
    private String email;

    private String preferredSpecies;
    private Integer minAgePreference;
    private Integer maxAgePreference;

    private String houseSize;
    private Boolean hasYard;
    private Integer hoursAvailablePerDay;
    private Boolean hasPreviousExperience;
    private Boolean hasSmallChildren;
    private Boolean hasOtherPets;
    private Integer activityLevel;
}
