package com.servidorjava.bagview.controller;

public class BandeiraValidacao {

    // Se for nulo ou menor que 6 nao da para fazer a validacao
    public static boolean identificarBandeira(String numeroCartao) {
        if (numeroCartao == null || numeroCartao.length() < 6) {
            return false;
        }

        // VISA COMECA COM 4
        // ELO COMECA COM 401178, 451416, 509000
        // MASTERCARD COMECA COM 51 e 55 ou 2221 a 2720

        // Pega os primeiros 6 dígitos do cartão, precisa de todos os 6 porque pode ser
        // ELO que valida com 6
        String primeirosSeisDigitos = numeroCartao.substring(0, 6);

        // Verifica se o cartão é de uma das bandeiras aceitas (VISA, Mastercard ou Elo)
        return ehVisa(primeirosSeisDigitos) || ehMastercard(primeirosSeisDigitos) || ehElo(primeirosSeisDigitos);
    }

    // Verifica se o cartão é VISA (começa com 4)
    private static boolean ehVisa(String primeirosSeisDigitos) {
        return primeirosSeisDigitos.startsWith("4");
    }

    // Verifica se o cartão é Mastercard (começa entre 51 e 55 ou 2221-2720)
    private static boolean ehMastercard(String primeirosSeisDigitos) {
        int prefixo = Integer.parseInt(primeirosSeisDigitos.substring(0, 6));
        return (prefixo >= 510000 && prefixo <= 559999) || (prefixo >= 222100 && prefixo <= 272099);
    }

    // Verifica se o cartão é Elo (o mais chatinho)
    private static boolean ehElo(String primeirosSeisDigitos) {
        // Lista de prefixos Elo
        String[] prefixosElo = {
                "401178", "401179", "431274", "438935", "451416", "457393", "457631", "457632",
                "504175", "506699", "506770", "506771", "506772", "506773", "506774", "506775",
                "506776", "506777", "509000", "509001", "509002", "509003", "509004", "509005",
                "509006", "509007", "509008", "509009", "636368", "636297", "636369", "627780"
        };

        // Verifica se o número do cartão começa com algum dos prefixos da bandeira Elo
        for (String prefixo : prefixosElo) {
            if (primeirosSeisDigitos.startsWith(prefixo)) {
                return true;
            }
        }
        return false;
    }
}