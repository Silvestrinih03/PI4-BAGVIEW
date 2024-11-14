package com.servidorjava.bagview.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/validar-senha")
@CrossOrigin(origins = "http://localhost:4201")
public class SenhaController {

    @PostMapping
    public boolean validarSenha(@RequestParam String senha) {
        return SenhaValidacao.validarSenha(senha);
    }
}