package org.example.gym_soft.controller;

import lombok.RequiredArgsConstructor;
import org.example.gym_soft.dto.user.LoginUserDto;
import org.example.gym_soft.dto.user.UserDto;
import org.example.gym_soft.service.auth.AuthService;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
  final AuthService authService;

  @PostMapping("/register")
  public HttpEntity<?> register(@RequestBody UserDto userDto) {
    return authService.registerUser(userDto);
  }

  @PostMapping("/login")
  public HttpEntity<?> login(@RequestBody LoginUserDto loginUserDto) {
    return authService.loginUser(loginUserDto);
  }

  @GetMapping("/me")
  public ResponseEntity<?> getRoles() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    return ResponseEntity.ok(authentication.getAuthorities());

  }


}
