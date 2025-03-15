export interface Habitacion{
    _id: string;
    numero: number;
    piso: number;
    precio: number;
    tipo: string;
    estado: string;
    camas: number;
    banos: number;
    tv: boolean;
    wifi: boolean;
    img: string;
    __v: number;
}

export interface habitacionesResponse{
    message: string;
    habitaciones: Habitacion[];
}