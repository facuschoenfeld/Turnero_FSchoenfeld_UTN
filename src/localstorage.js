export function leerDB(){
    return JSON.parse(localStorage.getItem("citas"))
}

export function escribirDB(datos){
    localStorage.setItem('citas', JSON.stringify(datos))
}
