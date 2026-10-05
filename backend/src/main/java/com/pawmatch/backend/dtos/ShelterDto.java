package com.pawmatch.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShelterDto {

    private Long id;
    private String name;
    private String email;
    private String contactPhone;
    private String address;
}
