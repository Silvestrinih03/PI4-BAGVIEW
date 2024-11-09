package com.servidorjava.bagview.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cpf")
@CrossOrigin(origins = "http://localhost:4201")
public class CPFController {

    @GetMapping("/validar")
    public boolean validarCPF(@RequestParam String cpf) {
        if (cpf == null || cpf.isEmpty()) {
            throw new IllegalArgumentException("O CPF não pode ser nulo ou vazio.");
        }
        return CPFValidacaoTeste.validarCPF(cpf);
    }
}

// Rodar no postman
// http://localhost:8080/api/cpf/validar?cpf=12345678909