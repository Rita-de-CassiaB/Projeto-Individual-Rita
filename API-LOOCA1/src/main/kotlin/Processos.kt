import java.time.LocalDateTime

class Processos (
    var PID: Int = 0,
    var dataHora: LocalDateTime,
    var nome: String,
    var usoCPU: Double = 0.0,
    var usoMemoria: Double = 0.0,
    var memoriaVirtual: Double = 0.0,
){

}