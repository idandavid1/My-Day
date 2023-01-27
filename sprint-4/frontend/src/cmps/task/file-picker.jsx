import { useState } from "react"



export function FilePicker({info , onUpdate}) {

    const [file , setFile] = useState(info.file || '')
    return (
        <section className="file-picker picker">
            <input type="file" />
        </section>
    )
}