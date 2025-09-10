import {useState} from "react"
import Contenedor from "./components/contenedor"
import Input from "./components/input"
import {ToastContainer, toast} from "react-toastify"
import {leerDB, escribirDB, formatoFecha} from "./localstorage"
import Tarjeta from "./components/tarjeta"
import { v4 as uuidv4 } from 'uuid'

const App = ()=>{

    const [nombreCompleto, modificarNombreCompleto] = useState("")
    const [horario, modificarHorario] = useState("")
    const [fecha, modificarFecha] = useState("")
    const [telefono, modificarTelefono] = useState("")
    const [citas, modificarCitas] = useState(leerDB() ?? [])
    const [id, modificarId] = useState(null)  

    const fechaHoy = new Date().toISOString().slice(0, 10)
    const semanaDespues = new Date()
    semanaDespues.setDate(semanaDespues.getDate() + 7)

    const manejarHorario = (evento)=>{
        const horaUsuario = evento.target.value
                    const horaUsuarioSplit = horaUsuario.split(":")
                    const hora = Number(horaUsuarioSplit[0])
                    const minutos = Number(horaUsuarioSplit[1])

                    if(hora >= 8 && hora <= 19){
                        if(minutos === 30 || minutos === 0){
                            modificarHorario(evento.target.value)
                            return
                        }
                        if(minutos > 15 && minutos < 45){
                            modificarHorario(`${horaUsuarioSplit[0]}:30`)
                        }
                        else if(minutos >= 45){
                            let horaFormateada = hora + 1
                            
                            if(horaFormateada >= 20){
                                toast.error("Fuera de horario")
                                return
                            }
                            
                            horaFormateada = horaFormateada.toString()
                            
                            if(horaFormateada.length === 1){
                                modificarHorario(`0${horaFormateada}:00`)
                            }
                            else{
                                modificarHorario(`${horaFormateada}:00`)
                            }
                        }
                        else{
                            modificarHorario(`${horaUsuarioSplit[0]}:00`)
                        }
                    }
                    else{
                        toast.error("Fuera de horario")
                    }
    }

    const borrarCita = (cita)=>{
        const confirmacion = confirm(`Desea eliminar la cita ${formatoFecha(cita.fecha, cita.horario)}`)

        if(confirmacion){
            const citasNoEliminadas = citas.filter((c)=>{
                if(c.id !== cita.id){
                    return cita
                }
            })
            
            escribirDB(citasNoEliminadas)
            modificarCitas(leerDB())
            toast.info("Se ha eliminado la cita")
            
            return
        }

        toast.info("Se ah cancelado la eliminacion")
    }

    const editarCita = (id)=>{
        const [citaFiltrada] = citas.filter((cita)=>{
            if(cita.id === id){
                return cita
            }
        })

        modificarId(citaFiltrada.id)
        modificarNombreCompleto(citaFiltrada.nombreCompleto)
        modificarFecha(citaFiltrada.fecha)
        modificarHorario(citaFiltrada.horario)
        modificarTelefono(citaFiltrada.telefono)
    }

    const limpiarEstados = ()=>{
        modificarId(null)
        modificarNombreCompleto("")
        modificarHorario("")
        modificarFecha("")
        modificarTelefono("")
    }

    const modificarGuardarCita = ()=>{
        const citasModificadas = citas.map((cita)=>{
            if(cita.id === id){
                return{
                    id: id,
                    nombreCompleto,
                    fecha,
                    horario,
                    telefono
                }
            }
            return cita
        })

        escribirDB(citasModificadas)
        modificarCitas(leerDB())
        limpiarEstados()
        toast.success("Cita modificada con exito")
    }

    const enviarFormulario = (evento)=>{
        evento.preventDefault()

        const horarioExistente = citas.some((cita)=>{
            return cita.horario === horario && cita.fecha === fecha
            
        })
        if(horarioExistente){
            toast.error("Ya existe un turno en este horario")
            return
        }

        if(id !== null){
            modificarGuardarCita()
            return
        }

        if([nombreCompleto, fecha, horario, telefono].includes("")){
            toast.error("Todos los campos son obligatorios")
            return
        }

        const turno = {
            id: uuidv4(),
            nombreCompleto,
            fecha,
            horario,
            telefono
        }

        const datos = leerDB() ?? []
        datos.push(turno)
        escribirDB(datos)

        modificarCitas(leerDB() ?? [])

        toast.success("Turno cargado exitosamente")
    }


    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-indigo-200 to-indigo-900 flex justify-center items-center gap-3 px-4">
        <Contenedor>
            <h2 className="text-4xl font-bold text-center mt-4 text-indigo-800">Formulario</h2>
            <form
            className="flex flex-col gap-5 pt-5" 
            onSubmit= {enviarFormulario}> 
                <Input 
                name="Nombre Completo"
                placeholder="Nombre Completo"
                type="text"
                value={nombreCompleto}
                onChange={(evento) =>{
                        modificarNombreCompleto(evento.target.value)
                    }
                }>
                
                </Input>

                <Input
                name= "Dia"
                type= "date"
                value= {fecha}
                min= {fechaHoy}
                max= {semanaDespues}
                onChange={(evento)=>{
                    const eleccion = new Date(evento.target.value)
                    if([0, 6].includes(eleccion.getDay())){
                        toast.error("Dia no disponible")
                    }
                    else{
                        modificarFecha(evento.target.value)
                    }
                }}>
                </Input>

                <Input
                name= "Horario"
                type= "time"
                step= "1800"
                min = "08:00:00"
                max = "20:00:00"
                value= {horario}
                onChange= {manejarHorario}>
                </Input>

                <Input
                name= "Telefono"
                placeholder= "Número de teléfono"
                type= "number"
                value={telefono}
                onChange={(evento)=>{
                    modificarTelefono(evento.target.value)
                }}
                >
                </Input>

                <input
                className="w-full p-2 text-center font-bold bg-indigo-800 text-slate-50 rounded-2xl mt-4 cursor-pointer
                hover:bg-indigo-400 transition-all" 
                type= "submit" 
                value= {id !== null ? "Modificar" : "Agendar"}/>
            </form>
        </Contenedor>
        
        <Contenedor className="bg-amber-50/40">
        <div>
            <h2 className="text-4xl font-bold text-center mt-4 text-indigo-800">Turnos</h2>
            <div className="h-[450px] overflow-auto flex flex-col gap-1 p-2">
                {
                    citas.map(cita=>{
                        return <Tarjeta
                        key={cita.id}
                        cita={cita}
                        borrar={borrarCita}
                        modificar={editarCita}
                        />
                    })
                }
            </div>
        </div>
        </Contenedor>
        <ToastContainer />
        </div>
    )
}

export default App