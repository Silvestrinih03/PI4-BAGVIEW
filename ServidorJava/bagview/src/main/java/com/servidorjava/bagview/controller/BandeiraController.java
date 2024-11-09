// package com.servidorjava.bagview.controller;

// import org.springframework.web.bind.annotation.*;

// @RestController
// public class BandeiraController {

//     @RestController
//     @RequestMapping("/validarcartao")
//     public class bandeiraController {

//         @PostMapping
//         public boolean validarCartao(@RequestParam String numeroCartao) {
//             return BandeiraValidacao.identificarBandeira(numeroCartao);
//         }
//     }

// }

package com.servidorjava.bagview.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/validarcartao") // A URL base para este controlador
public class BandeiraController {

    // Método que valida o número do cartão usando @RequestParam
    @PostMapping
    public boolean validarCartao(@RequestParam String numeroCartao) {
        return BandeiraValidacao.identificarBandeira(numeroCartao);
    }
}
