package com.servidorjava.bagview.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cpf")
public class CPFController {

    @GetMapping("/validar")
    public boolean validarCPF(@RequestParam String cpf) {
        return CPFValidacaoTeste.validarCPF(cpf);
    }
}
