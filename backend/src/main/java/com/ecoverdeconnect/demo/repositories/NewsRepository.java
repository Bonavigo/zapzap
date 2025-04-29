package com.ecoverdeconnect.demo.repositories;

import com.ecoverdeconnect.demo.entities.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Long> {
}
