import psutil
import threading
import time
import keyboard
import socket
import mysql.connector
from cred import usr, pswd
import speedtest

def get_network_stats():
    network_stats = psutil.net_io_counters()
    return network_stats.bytes_sent, network_stats.bytes_recv

def get_process_network_info(process):
    try:
        process_info = process.info
        pid = process_info['pid']
        process_name = process_info['name']
        username = process_info['username']

        # Obtendo as estatísticas de rede globais
        net_io_counters = psutil.net_io_counters()

        # Calculando a diferença nas estatísticas de rede para obter os bytes enviados e recebidos desde a última leitura
        sent_bytes = net_io_counters.bytes_sent
        received_bytes = net_io_counters.bytes_recv

        return pid, process_name, username, sent_bytes, received_bytes
    except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
        # Pode ocorrer exceções se o processo não estiver mais em execução
        return None

def get_network_usage():
    # Obtém estatísticas de rede por processo
    network_stats = psutil.net_io_counters(pernic=True)

    # Dicionário para armazenar informações de rede por processo
    process_network_usage = {}

    # Lista de processos em execução
    processes = psutil.process_iter(['pid', 'name', 'username'])

    for process in processes:
        process_info = get_process_network_info(process)
        if process_info:
            pid, process_name, username, sent_bytes, received_bytes = process_info

            # Armazenando essas informações no dicionário
            process_network_usage[pid] = {
                'Process Name': process_name,
                'Username': username,
                'Sent Bytes': sent_bytes,
                'Received Bytes': received_bytes
            }

    return process_network_usage

event = threading.Event()
print(event)

def stop():
    event.set()
    print("\nFinalizando monitoramento")
    print(event)

keyboard.add_hotkey("esc", stop)

while not event.is_set():
    if __name__ == "__main__":
        try:
            mydb = mysql.connector.connect(host='localhost', user=usr, password=pswd, database='nocline')

            if mydb.is_connected():
                db_info = mydb.get_server_info()
                mycursor = mydb.cursor()

                hostname = socket.gethostname()
                sql_query = "SELECT id_maquina, fk_empresaM FROM maquina WHERE hostname = %s;"
                mycursor.execute(sql_query, (hostname,))

                result = mycursor.fetchone()

                print("capturando")

                try:
                    teste = speedtest.Speedtest()
                    teste.get_best_server()

                    if result:
                        id_maquina, fk_empresaM = result

                        while not event.is_set():
                            bytes_sent_before, bytes_recv_before = get_network_stats()
                            time.sleep(1)

                            # Rede
                            velocidade_download = teste.download()
                            velocidade_upload = teste.upload()
                            ping = teste.results.ping
                            latencia = ping / 2

                            bytes_sent_after, bytes_recv_after = get_network_stats()
                            # Calcular bytes enviados e recebidos durante o intervalo de 1 segundo
                            bytes_enviados = bytes_sent_after - bytes_sent_before
                            bytes_recebidos = bytes_recv_after - bytes_recv_before
                            print("Inserindo dados de rede")

                            # SQL Query para inserir dados de rede no banco de dados
                            sql_query_network = """
                                    INSERT INTO monitoramento (dado_coletado, data_hora, descricao, fk_componentes_monitoramento, fk_maquina_monitoramento, fk_empresa_monitoramento, fk_unidade_medida)
                                    VALUES (%s, now(), 'velocidade de download', (SELECT id_componente from componente WHERE nome_componente = 'REDE' and fk_maquina_componente = %s), %s, %s, (SELECT id_unidade FROM unidade_medida WHERE representacao = %s)),
                                           (%s, now(), 'velocidade de upload', (SELECT id_componente from componente WHERE nome_componente = 'REDE' and fk_maquina_componente = %s), %s, %s, (SELECT id_unidade FROM unidade_medida WHERE representacao = %s)),
                                           (%s, now(), 'ping', (SELECT id_componente from componente WHERE nome_componente = 'REDE' and fk_maquina_componente = %s), %s, %s, (SELECT id_unidade FROM unidade_medida WHERE representacao = %s)),
                                           (%s, now(), 'latencia', (SELECT id_componente from componente WHERE nome_componente = 'REDE' and fk_maquina_componente = %s), %s, %s, (SELECT id_unidade FROM unidade_medida WHERE representacao = %s)),
                                           (%s, now(), 'bytes enviados py', (SELECT id_componente from componente WHERE nome_componente = 'REDE' and fk_maquina_componente = %s), %s, %s, (SELECT id_unidade FROM unidade_medida WHERE representacao = %s)),
                                           (%s, now(), 'bytes recebidos py', (SELECT id_componente from componente WHERE nome_componente = 'REDE' and fk_maquina_componente = %s), %s, %s, (SELECT id_unidade FROM unidade_medida WHERE representacao = %s));
                                           """

                            val_network = [velocidade_download, id_maquina, id_maquina, fk_empresaM, 'B',
                                       velocidade_upload, id_maquina, id_maquina, fk_empresaM, 'B',
                                       ping, id_maquina, id_maquina, fk_empresaM, 'MS',
                                       latencia, id_maquina, id_maquina, fk_empresaM, 'MS',
                                       bytes_enviados, id_maquina, id_maquina, fk_empresaM, 'B',
                                       bytes_recebidos, id_maquina, id_maquina, fk_empresaM, 'B']

                            mycursor.execute(sql_query_network, val_network)
                            mydb.commit()
                            print(mycursor.rowcount, "registros inseridos no banco (rede)")
                            print("\r\n")

                            # Capturando dados de processos
                            print("Capturando dados de processos")

                            # Obtendo as estatísticas de rede globais fora do loop for
                            net_io_counters = psutil.net_io_counters()

                            # Lista para armazenar informações da rede por processo
                            process_network_info_list = []

                            # Lista de processos em execução
                            processes = psutil.process_iter(['pid', 'name', 'username'])

                            for process in processes:
                                process_info = get_process_network_info(process)
                                if process_info:
                                    pid, process_name, username, sent_bytes, received_bytes = process_info

                                    # Adicionando essas informações à lista
                                    process_network_info_list.append([pid, process_name, username, sent_bytes, received_bytes])

                                    # SQL Query para atualizar dados de processos no banco de dados
                                    sql_query_process = """
                                       UPDATE processos SET bytes_enviados = %s, bytes_recebidos = %s WHERE pid = %s and fk_maquinaP = %s;
                                    """

                                    # Acessando as informações do processo na lista
                                    val_process = [sent_bytes, received_bytes, pid, id_maquina]
                                    print(val_process)
                                    mycursor.execute(sql_query_process, val_process)
                                    mydb.commit()
                                    print(mycursor.rowcount, "registros atualizados no banco (processos)")
                                    print("\r\n")

                            time.sleep(5)

                except mysql.connector.Error as e:
                    print("Erro ao conectar com o MySQL:", e)
                    mycursor.close()

                finally:
                    if mydb.is_connected():
                        mycursor.close()
                        mydb.close()

        except speedtest.SpeedtestBestServerFailure as e:
            print(f"Erro ao obter o melhor servidor: {e}")
