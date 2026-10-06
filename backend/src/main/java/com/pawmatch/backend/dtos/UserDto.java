package com.pawmatch.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private Long id;
    private String name;
    private String email;
    private Boolean hasPreviousExperience;
    private Boolean hasSmallChildren;
    private Boolean hasOtherPets;
    private Integer activityLevel;
}
