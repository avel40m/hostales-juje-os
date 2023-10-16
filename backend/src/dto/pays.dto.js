export class PaysDTO {
    constructor(id,personas,usuario,lugar,precio,metodo_pago,estado,total_pago,tarjeta,ganancia,fecha_pago){
        this.id = id;
        this.personas = personas;
        this.usuario = usuario;
        this.lugar = lugar;
        this.precio = precio;
        this.metodo_pago = metodo_pago;
        this.estado = estado;
        this.tarjeta = tarjeta;
        this.total_pago = total_pago;
        this.ganancia= ganancia;
        this.fecha_pago= fecha_pago;
    }
}