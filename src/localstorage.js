export function leerDB(){
    return JSON.parse(localStorage.getItem("citas"))
}

export function escribirDB(datos){
    localStorage.setItem('citas', JSON.stringify(datos))
}

export function formatoFecha(fecha, hora){
    const dateTime = new Date(`${fecha}T${hora}`)

    return(
        dateTime.toLocaleDateString("es-ES", {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        })
    )
}