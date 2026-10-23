package com.pawmatch.backend.controllers;

import com.pawmatch.backend.dtos.UserDto;
import com.pawmatch.backend.dtos.UserRegisterDto;
import com.pawmatch.backend.facades.UserFacade;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserFacade userFacade;

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody final UserRegisterDto userRegisterDto) {
        return ResponseEntity.ok(userFacade.registerUser(userRegisterDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable final Long id) {
        return ResponseEntity.ok(userFacade.getUserById(id).orElse(null));
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody UserDto requestDto) {
        try {
            userFacade.update(requestDto);
            return ResponseEntity.ok("Usuario actualizado correctamente");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
