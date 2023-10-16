export class HostalDTO{
    constructor(id,lugar,nombre,precio,telefono){
        this.id = id;
        this.lugar = lugar;
        this.nombre = nombre;
        this.precio = precio;
        this.telefono = telefono;
    }
}

export class HostalMenuDTO{
    constructor(id,nombre,lugar,descripcion,precio,telefono,imagen,address,ubicacion){
        this.id = id;
        this.nombre = nombre;
        this.lugar = lugar;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
        this.telefono = telefono;
        this.address = address;
        this.ubicacion = ubicacion;
    }
}