package com.ecoverdeconnect.demo.services;

import com.ecoverdeconnect.demo.entities.User;
import com.ecoverdeconnect.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado."));
    }

    public boolean registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return false;
        }
        userRepository.save(user);
        return true;
    }

    public boolean authenticateUser(String username, String password) {
        User existingUser = userRepository.findByUsername(username);
        return existingUser != null && existingUser.getPassword().equals(password);
    }
}
