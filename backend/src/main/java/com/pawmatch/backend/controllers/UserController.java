package com.pawmatch.backend.controllers;

import com.pawmatch.backend.dtos.UserDto;
import com.pawmatch.backend.dtos.UserRegisterDto;
import com.pawmatch.backend.facades.UserFacade;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserFacade userFacade;

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody final UserRegisterDto userRegisterDto) {
        return ResponseEntity.ok(userFacade.registerUser(userRegisterDto));
    }
}
