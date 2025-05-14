package com.ecoverdeconnect.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping; // Importe GetMapping
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam; // Importe RequestParam
import org.springframework.web.bind.annotation.RestController;

import com.ecoverdeconnect.demo.entities.User;
import com.ecoverdeconnect.demo.services.UserService;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping(value = "/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody User user) {
        boolean success = userService.registerUser(user);
        return success ? ResponseEntity.status(HttpStatus.CREATED).body("User registrado com sucesso!") :
                       ResponseEntity.status(HttpStatus.CONFLICT).body("Nome de usuário já existe!");
    }

    @PostMapping("/login")
    public  ResponseEntity<String> login(@RequestBody User user) {
        boolean success = userService.authenticateUser(user.getUsername(), user.getPassword());
        return success ? ResponseEntity.status(HttpStatus.OK).body("Login bem-sucedido!") : // Alterei para HttpStatus.OK
                ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas!"); // Alterei para HttpStatus.UNAUTHORIZED
    }
}