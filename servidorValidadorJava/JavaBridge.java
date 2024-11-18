import java.io.*;
import java.net.*;

public class JavaBridge {
    public static void main(String[] args) {
        int bridgePort = 4000;
        String javaServerHost = "localhost";
        int javaServerPort = 3000;

        try (ServerSocket serverSocket = new ServerSocket(bridgePort)) {
            System.out.println("Java bridge listening on port " + bridgePort);

            while (true) {
                Socket nodeClientSocket = serverSocket.accept();
                System.out.println("Connection accepted from " + nodeClientSocket.getInetAddress());

                new Thread(() -> handleClient(nodeClientSocket, javaServerHost, javaServerPort)).start();
            }
        } catch (IOException e) {
            System.err.println("Error starting Java bridge: " + e.getMessage());
        }
    }

    private static void handleClient(Socket nodeClientSocket, String javaServerHost, int javaServerPort) {
        try (
                BufferedReader nodeIn = new BufferedReader(new InputStreamReader(nodeClientSocket.getInputStream()));
                PrintWriter nodeOut = new PrintWriter(nodeClientSocket.getOutputStream(), true)) {
            String request = nodeIn.readLine();

            if (request == null) {
                System.out.println("No data received from Node.js client.");
                return;
            }

            String[] parts = request.split(",");
            if (parts.length != 2) {
                nodeOut.println("Invalid format. Use: tipoValidacao,valor");
                return;
            }

            String tipoValidacao = parts[0].trim();
            String valor = parts[1].trim();

            try (
                    Socket javaServerSocket = new Socket(javaServerHost, javaServerPort);
                    ObjectOutputStream javaOut = new ObjectOutputStream(javaServerSocket.getOutputStream());
                    ObjectInputStream javaIn = new ObjectInputStream(javaServerSocket.getInputStream())) {
                Comunicado comunicado = null;
                switch (tipoValidacao.toLowerCase()) {
                    case "cartao":
                        comunicado = new ValidarCartao(valor);
                        break;
                    case "cpf":
                        comunicado = new ValidarCpf(valor);
                        break;
                    case "senha":
                        comunicado = new ValidarSenha(valor);
                        break;
                    default:
                        nodeOut.println("Tipo de validação desconhecido");
                        return;
                }

                javaOut.writeObject(comunicado);
                javaOut.flush();

                Object responseObj = javaIn.readObject();
                if (responseObj instanceof Resultado) {
                    Resultado resultado = (Resultado) responseObj;
                    String response = resultado.getValorResultante() ? "Valido" : "Invalido";
                    nodeOut.println(response);
                } else {
                    nodeOut.println("Resposta desconhecida do servidor Java");
                }
            } catch (Exception e) {
                nodeOut.println("Erro ao comunicar com o servidor Java: " + e.getMessage());
            }
        } catch (IOException e) {
            System.err.println("Erro ao comunicar com o cliente Node.js: " + e.getMessage());
        } finally {
            try {
                nodeClientSocket.close();
            } catch (IOException e) {
                System.err.println("Erro ao fechar conexão com o cliente Node.js: " + e.getMessage());
            }
        }
    }
}