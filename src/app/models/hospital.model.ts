interface _hospitalUser{
    nombre: string,
    _id:string,
    img:string
}
export interface  RespHospital{
     ok:boolean, 
     hospital:Hospital[] 
}

export class Hospital{ 
    constructor(
        public nombre:string,
        public _id?:string,
        public img?:string,
        public usuario?:_hospitalUser,
    ){

    }
}