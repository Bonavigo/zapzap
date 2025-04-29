package com.ecoverdeconnect.demo.controllers;


import com.ecoverdeconnect.demo.entities.User;
import com.ecoverdeconnect.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return success ? ResponseEntity.status(HttpStatus.CREATED).body("Login bem-sucedido!") :
                ResponseEntity.status(HttpStatus.CONFLICT).body("Credenciais inválidas!");
    }
}
