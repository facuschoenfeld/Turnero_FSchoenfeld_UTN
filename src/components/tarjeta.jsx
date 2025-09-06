import {formatoFecha} from "../localstorage"
import {Edit, Delete} from "lucide-react"

const Tarjeta = ({cita, modificar, borrar}) => {
    return (
        <div className="p-1 bg-amber-50/20 rounded shadow flex">
            <div className="flex-1">
                <p className="font-bold text-black/80">{cita.nombreCompleto}</p>
                <p>{formatoFecha(cita.fecha, cita.horario)}</p>
                <p>Telefono: {cita.telefono}</p>
            </div>
            <div className="flex flex-col items-end justify-center">
                <button className="p-0.5 rounded hover:bg-blue-700/20 cursor-pointer" title="Editar"><Edit color="blue"/></button>
                <button className="p-0.5 rounded hover:bg-red-600/20 cursor-pointer" title="Borrar"><Delete color="red"/></button>
            </div>
        </div>
    )
}

export default Tarjeta