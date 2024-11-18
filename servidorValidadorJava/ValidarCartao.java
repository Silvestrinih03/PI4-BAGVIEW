public class ValidarCartao extends Comunicado {
    private String numeroCartao;

    public ValidarCartao(String numeroCartao) {
        this.numeroCartao = numeroCartao.replaceAll("\\s+", "");
    }

    public boolean isValid() {
        if (this.numeroCartao == null || this.numeroCartao.isEmpty() || this.numeroCartao.length() != 16)
            return false;

        return ehElo() || ehVisa() || ehMastercard();
    }

    // Verifica se o cartão é VISA (começa com 4)
    private boolean ehVisa() {
        return this.numeroCartao.startsWith("4");
    }

    // Verifica se o cartão é Mastercard (começa entre 51 e 55 ou 2221-2720)
    private boolean ehMastercard() {
        int prefixo = Integer.parseInt(this.numeroCartao.substring(0, 6));
        return (prefixo >= 510000 && prefixo <= 559999) || (prefixo >= 222100 && prefixo <= 272099);
    }

    // Verifica se o cartão é Elo (o mais chatinho)
    private boolean ehElo() {
        var primeirosSeisDigitos = this.numeroCartao.substring(0, 6);

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