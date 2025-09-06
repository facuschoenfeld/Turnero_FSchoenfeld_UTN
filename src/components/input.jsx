const Input=({name, onChange, value, type, placeholder, min, max})=>{
    return(
        <div className="flex flex-col gap-2">
            <label htmlFor={name}>{name}</label>
            <input
            className="p-1 border-[1px] border-slate-400 rounded shadow"
            name={name}
            id={name}
            type={type}
            placeholder={placeholder} 
            value={value}
            min={min}
            max={max} 
            onChange={onChange} />
        </div>
    )
}

export default Input