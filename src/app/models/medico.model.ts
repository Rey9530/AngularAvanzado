import { Hospital } from "./hospital.model"

interface _medicoUser{
    nombre: string,
    _id:string,
    img:string
}
export interface  RespMedico{
     ok:boolean, 
     medico:Medico[] 
}

export class Medico{ 
    constructor(
        public nombre:string,
        public _id?:string,
        public img?:string,
        public usuario?:_medicoUser,
        public hospital?:Hospital,
    ){ }
}