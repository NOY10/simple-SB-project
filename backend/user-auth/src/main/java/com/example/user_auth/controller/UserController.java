package com.example.user_auth.controller;


import com.example.user_auth.dto.ApiResponse;
import com.example.user_auth.dto.UpdatePasswordRequest;
import com.example.user_auth.dto.UpdateUserRequestDto;
import com.example.user_auth.dto.UserResponseDto;
import com.example.user_auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("getAllUser")
    public ResponseEntity<ApiResponse<List<UserResponseDto>>>  getAllUser(){
        List<UserResponseDto> allUser = userService.getAllUser();
        ApiResponse<List<UserResponseDto>> response = new ApiResponse<>(true, "All User", allUser);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponseDto>>  getUser(@PathVariable Integer id){
        UserResponseDto user=userService.getUserByID(id);
        ApiResponse<UserResponseDto> response = new ApiResponse<>(true, "User fetched successfully", user);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PutMapping("/{id}/password")
    public ResponseEntity<ApiResponse<String>> updateUserPassword(@PathVariable Integer id, @RequestBody UpdatePasswordRequest request){
        userService.updateUserPassword(id,request);
        ApiResponse<String> response = new ApiResponse<>(true, "Password updated successfully", null);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}/user")
    public ResponseEntity<ApiResponse<UserResponseDto>>  updateUser(@PathVariable Integer id, @RequestBody UpdateUserRequestDto request){
        UserResponseDto UserResponseDto=userService.updateUser(id,request);
        ApiResponse<UserResponseDto> response = new ApiResponse<>(true, "User updated successfully", UserResponseDto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
