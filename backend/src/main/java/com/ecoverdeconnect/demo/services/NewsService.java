package com.ecoverdeconnect.demo.services;

import com.ecoverdeconnect.demo.entities.News;
import com.ecoverdeconnect.demo.repositories.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsService {

    @Autowired
    private NewsRepository newsRepository;

    public List<News> findAll() {
        return newsRepository.findAll();
    }
}
