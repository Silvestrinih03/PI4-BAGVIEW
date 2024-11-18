import java.net.*;
import java.util.*;

public class AceitadoraDeConexao extends Thread {
    private ServerSocket pedido;
    private ArrayList<Parceiro> usuarios;

    public AceitadoraDeConexao(String porta, ArrayList<Parceiro> usuarios)
            throws Exception {
        if (porta == null)
            throw new Exception("Porta ausente");

        try {
            this.pedido = new ServerSocket(Integer.parseInt(porta));
            System.out.println("Servidor escutando na porta " + porta);
        } catch (Exception erro) {
            throw new Exception("Porta invalida: " + erro.getMessage());
        }

        if (usuarios == null)
            throw new Exception("Usuarios ausentes");

        this.usuarios = usuarios;
    }

    public void run() {
        while (true) {
            Socket conexao = null;
            try {
                conexao = this.pedido.accept();
                System.out.println("Nova conexão aceita: " + conexao.getInetAddress().getHostAddress());
            } catch (Exception erro) {
                System.err.println("Erro ao aceitar conexão: " + erro.getMessage());
                continue;
            }

            SupervisoraDeConexao supervisoraDeConexao = null;
            try {
                supervisoraDeConexao = new SupervisoraDeConexao(conexao, usuarios);
                supervisoraDeConexao.start();
            } catch (Exception erro) {
                System.err.println("Erro ao iniciar supervisora de conexão: " + erro.getMessage());
            }
        }
    }
}