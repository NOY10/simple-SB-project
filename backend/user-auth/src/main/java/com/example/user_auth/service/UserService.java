package com.example.user_auth.service;

import com.example.user_auth.dto.UpdatePasswordRequest;
import com.example.user_auth.dto.UpdateUserRequestDto;
import com.example.user_auth.dto.UserResponseDto;

import java.util.List;

public interface UserService{
    List<UserResponseDto> getAllUser();
    UserResponseDto getUserByID(Integer id);
    void updateUserPassword(Integer id, UpdatePasswordRequest request);
    UserResponseDto updateUser(Integer id, UpdateUserRequestDto request);
}
