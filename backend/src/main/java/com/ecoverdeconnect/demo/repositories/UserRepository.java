package com.ecoverdeconnect.demo.repositories;

import com.ecoverdeconnect.demo.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
}
