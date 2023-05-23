export default function Validator(property, value) {
    let error = {};
    const validarValorNum=(property,valor)=>{
        let Result=true;
        if(valor < 0 || valor > 255){
            Result=false;
            error[property]="El valor debe ser mayor o igual a 0 y menor o igual a 255";
        }
        return Result;
    }
    switch (property) {
        case "nombre":
            if(!value){
                error.nombre="Debes ingresar un nombre";
            }else{
                const nameValidation = /^[a-zA-Z\s]*$/;
                if (!nameValidation.test(value)) {
                    error.nombre = "El nombre solo debe contener letras";
                } else {
                    error.nombre = "";
                }
            }
            break;
		case "imagen":
            if(!value){
                error.img = "Debes ingresar una URL de imagen";
            }else{
                const imgValidation = /^(http|https):\/\/.+/;
                if (!imgValidation.test(value)) {
                    error.imagen = "La URL debe comenzar con http o https";
                } else {
                    error.imagen = "";
                }
            }
            break;
        default:
            if(validarValorNum(property,value)){
                error[property]="";
            }
            break;
    }
    if (property === "name" && !value) {
        error.name = "Debes ingresar un nombre";
    } else if (property === "name") {
        const nameValidation = /^[a-zA-Z\s]*$/;
        if (!nameValidation.test(value)) {
        error.name = "El nombre solo debe contener letras";
        } else {
        error.name = "";
        }
    }
  return error;
}