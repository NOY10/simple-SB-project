package com.example.user_auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequestDto {

    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private Set<String> roles;

}
