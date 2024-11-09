package com.servidorjava.bagview.controller;

import org.springframework.web.bind.annotation.*;

@RestController
public class SenhaController {

    @PostMapping("/validar-senha")
    public boolean validarSenha(@RequestBody String senha) {
        return SenhaValidacao.validarSenha(senha);
    }
}