package com.example.user_auth.service;

import com.example.user_auth.dto.UpdatePasswordRequest;
import com.example.user_auth.dto.UpdateUserRequestDto;
import com.example.user_auth.dto.UserResponseDto;
import com.example.user_auth.exception.ResourceNotFoundException;
import com.example.user_auth.model.UserEntity;
import com.example.user_auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    private UserResponseDto mapToDto(UserEntity user) {
        return new UserResponseDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getUsername(),
                user.getEmail(),
                user.getRoles()
        );
    }


    @Override
    public List<UserResponseDto> getAllUser() {
        return userRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponseDto getUserByID(Integer id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
        return mapToDto(user);

    }

    @Override
    public void updateUserPassword(Integer id, UpdatePasswordRequest request) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Old password is incorrect.");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    @Override
    @Transactional
    public UserResponseDto updateUser(Integer id, UpdateUserRequestDto request) {

        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));

        // ── 1. Uniqueness checks (ignore the current user) ───────────────────────────
        if (userRepository.existsByUsernameAndIdNot(request.getUsername(), Long.valueOf(id))) {
            throw new RuntimeException("Username is already taken.");
        }

        if (userRepository.existsByEmailAndIdNot(request.getEmail(), Long.valueOf(id))) {
            throw new RuntimeException("Email is already taken.");
        }

        // ── 2. Map roles from names to entities ──────────────────────────────────────
        Set<String> userRoles = request.getRoles();

        // ── 3. Apply the changes ─────────────────────────────────────────────────────
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setRoles(userRoles);

        // Because the entity is managed in the current transaction,
        // `save` is optional – but it’s harmless if you prefer it.
        userRepository.save(user);
        return mapToDto(user);
    }


}
