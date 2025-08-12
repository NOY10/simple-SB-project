package com.example.social_clone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class SocialCloneApplication {

	public static void main(String[] args) {
		SpringApplication.run(SocialCloneApplication.class, args);
	}

}
