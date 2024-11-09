package com.servidorjava.bagview.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    @GetMapping("/user")
    public User getUser() {
        return new User("John Doe", "johndoe@example.com", "Plano Premium");
    }

    public static class User {
        private String name;
        private String email;
        private String plan;

        public User(String name, String email, String plan) {
            this.name = name;
            this.email = email;
            this.plan = plan;
        }

        public String getName() {
            return name;
        }

        public String getEmail() {
            return email;
        }

        public String getPlan() {
            return plan;
        }
    }
}
