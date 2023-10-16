export class MyBookings {
    constructor(id,cantidad,fecha_llegada,fecha_salida,precio,nombre,lugar,imagen,telefono,address,pay,ubicacion){
        this.id = id;
        this.cantidad = cantidad;
        this.fecha_llegada = fecha_llegada;
        this.fecha_salida = fecha_salida;
        this.precio = precio;
        this.nombre = nombre;
        this.lugar = lugar;
        this.imagen = imagen;
        this.telefono = telefono;
        this.address = address;
        this.pay = pay;
        this.ubicacion = ubicacion;
    }
}

export class getBookingsDTO{
    constructor(id,lugar,personas,precio,checkin,checkout,pago){
        this.id = id;
        this.lugar = lugar;
        this.personas = personas;
        this.precio = precio;
        this.checkin = checkin;
        this.checkout = checkout;
        this.pago = pago;
    }
}