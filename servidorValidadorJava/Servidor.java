import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.*;

public class Servidor {
    public static String PORTA_PADRAO = "3000";

    public static void main(String[] args) {
        if (args.length > 1) {
            System.err.println("Uso esperado: java Servidor [PORTA]\n");
            return;
        }

        String porta = Servidor.PORTA_PADRAO;

        if (args.length == 1)
            porta = args[0];

        ArrayList<Parceiro> usuarios = new ArrayList<Parceiro>();

        AceitadoraDeConexao aceitadoraDeConexao = null;
        try {
            aceitadoraDeConexao = new AceitadoraDeConexao(porta, usuarios);
            aceitadoraDeConexao.start();
        } catch (Exception erro) {
            System.err.println("Escolha uma porta apropriada e liberada para uso!\n");
            return;
        }

        for (;;) {
            System.out.println("O servidor esta ativo! Para desativa-lo,");
            System.out.println("use o comando \"desativar\"\n");
            System.out.print("> ");

            String comando = null;
            try {
                comando = Teclado.getUmString();
            } catch (Exception erro) {
            }

            if (comando.toLowerCase().equals("desativar")) {
                synchronized (usuarios) {
                    ComunicadoDeDesligamento comunicadoDeDesligamento = new ComunicadoDeDesligamento();

                    for (Parceiro usuario : usuarios) {
                        try {
                            usuario.receba(comunicadoDeDesligamento);
                            usuario.adeus();
                        } catch (Exception erro) {
                        }
                    }
                }

                System.out.println("O servidor foi desativado!\n");
                System.exit(0);
            } else
                System.err.println("Comando invalido!\n");
        }
    }
}

class ClientHandler implements Runnable {
    private Socket socket;

    public ClientHandler(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {
        try (BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                PrintWriter out = new PrintWriter(socket.getOutputStream(), true)) {

            String request = in.readLine();
            String[] parts = request.split(",");
            String tipoValidacao = parts[0];
            String valor = parts[1];

            boolean isValid = false;

            switch (tipoValidacao.toLowerCase()) {
                case "cartao":
                    ValidarCartao validarCartao = new ValidarCartao(valor);
                    isValid = validarCartao.isValid();
                    break;
                case "cpf":
                    ValidarCpf validarCpf = new ValidarCpf(valor);
                    isValid = validarCpf.isValid();
                    break;
                case "senha":
                    ValidarSenha validarSenha = new ValidarSenha(valor);
                    isValid = validarSenha.isValid();
                    break;
                default:
                    out.println("Tipo de validação desconhecido");
                    return;
            }

            String response = isValid ? "Valido" : "Invalido";
            out.println(response);

        } catch (IOException e) {
            System.err.println("Erro ao comunicar com o cliente: " + e.getMessage());
        }
    }
}