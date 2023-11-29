import psutil

def get_network_usage():
    # Obtém estatísticas de rede por processo
    network_stats = psutil.net_io_counters(pernic=True)

    # Obtém uma lista de processos em execução
    processes = psutil.process_iter(['pid', 'name', 'username'])

    # Dicionário para armazenar informações de rede por processo
    process_network_usage = {}

    for process in processes:
        try:
            # Obtém as informações de rede para o processo
            process_info = process.info
            pid = process_info['pid']
            process_name = process_info['name']
            username = process_info['username']

            # Obtém as estatísticas de rede específicas do processo
            process_network_info = network_stats.get(process_name, psutil.net_io_counters())

            # Armazena as informações no dicionário
            process_network_usage[pid] = {
                'Process Name': process_name,
                'Username': username,
                'Sent Bytes': process_network_info.bytes_sent,
                'Received Bytes': process_network_info.bytes_recv
            }
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            # Pode ocorrer exceções se o processo não estiver mais em execução
            pass

    return process_network_usage

# Obtém e imprime as informações de rede por processo
network_usage = get_network_usage()
for pid, info in network_usage.items():
    print(f"PID: {pid}, Process Name: {info['Process Name']}, Username: {info['Username']}, Sent Bytes: {info['Sent Bytes']}, Received Bytes: {info['Received Bytes']}")
