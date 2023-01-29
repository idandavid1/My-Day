import { useState } from 'react'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { uploadService } from '../../services/upload.service'

export function FilePicker({ info, onUpdate }) {
    const [imgData, setImgData] = useState({
        imgUrl: info.file ? info.file : null,
        height: 19,
        width: 19,
    })


    async function uploadImg(ev) {
        const { secure_url, height, width } = await uploadService.uploadImg(ev)
        setImgData({ imgUrl: secure_url, width, height })
        onUpdate('file', secure_url)
    }

    return (
        <section className="file-picker picker">
            <label htmlFor="file-upload">
                {!imgData.imgUrl && <AiOutlineFileAdd className="icon" />}
                {imgData.imgUrl && <img className="file-img" src={imgData.imgUrl} style={{ maxWidth: '19px', float: 'right' }} />}
            </label>
            <input type="file" onUpdate={uploadImg} id="file-upload" />
        </section>
    )
}