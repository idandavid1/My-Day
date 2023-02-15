import { useEffect, useRef, useState } from 'react'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { uploadService } from '../../services/upload.service'

export function FilePicker({ info, onUpdate }) {
    const [imgData, setImgData] = useState({
        imgUrl: info.file ? info.file : null,
        height: 19,
        width: 19,
    })
    const inputRef = useRef()
    // const [info , setInfo] = useState(info)

    useEffect(() => {
        inputRef.current.addEventListener('change', (ev) => uploadImg(ev, info))
    }, [])
    
    // useEffect(() => {
        //     if (!imgData.imgUrl) return
        //     console.log('Updated')
        
        // }, [imgData])
        
        async function uploadImg(ev, info) {
        console.log('file cmp1', info)
        try {
            const { secure_url, height, width } = await uploadService.uploadImg(ev)
            setImgData({ imgUrl: secure_url, width, height })
            onUpdate('file', imgData.imgUrl)
        } catch (err) {
            console.log(err)
        }
    }

    // function check(ev , info) {
    //     console.log('file cmp2', info)
    //     return uploadImg(ev , info)()        
    // }

    return (
        <section className="file-picker picker">
            <label htmlFor="file-upload">
                {imgData.imgUrl && <img className="file-img" src={imgData.imgUrl} style={{ maxWidth: '19px', float: 'right' }} alt="" />}
                {!imgData.imgUrl && <AiOutlineFileAdd className="icon" />}
            </label>
            <input ref={inputRef} type="file"  accept="img/*" id="file-upload" />
        </section>
    )
}