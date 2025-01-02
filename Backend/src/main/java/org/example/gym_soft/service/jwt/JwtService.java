package org.example.gym_soft.service.jwt;

import org.example.gym_soft.entity.User;

public interface JwtService {
  String generateJwtToken(User user);

  String extractJwtToken(String token);
}
