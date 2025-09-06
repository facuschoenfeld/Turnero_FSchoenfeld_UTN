const Contenedor = ({className, children}) =>{
    return(<div className={`w-[400px] h-[550px] rounded-2xl p-[16px] shadow ${className ? className : "bg-amber-50"}`}>
        {children}
        </div>
        )
}

export default Contenedor