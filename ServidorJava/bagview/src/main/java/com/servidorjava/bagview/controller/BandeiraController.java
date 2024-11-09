package com.servidorjava.bagview.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/validarcartao") // A URL base para este controlador
@CrossOrigin(origins = "http://localhost:4201")
public class BandeiraController {

    // Método que valida o número do cartão usando @RequestParam
    @PostMapping
    public boolean validarCartao(@RequestParam String numeroCartao) {
        return BandeiraValidacao.identificarBandeira(numeroCartao);
    }
}

// Rodar no postman
// http://localhost:8080/validarcartao?numeroCartao=4011781234567890
