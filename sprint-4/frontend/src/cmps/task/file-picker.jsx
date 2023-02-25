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
        try {
            const { secure_url, height, width } = await uploadService.uploadImg(ev)
            setImgData({ imgUrl: secure_url, width, height })
            onUpdate('file', imgData.imgUrl)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <section className="file-picker picker">
            <label htmlFor={'file-upload' + info.id}>
                {imgData.imgUrl && <img className="file-img" src={imgData.imgUrl} style={{ maxWidth: '19px', float: 'right' }} alt="" />}
                {!imgData.imgUrl && <AiOutlineFileAdd className="icon" />}
            </label>
            <input type="file" accept="img/*" onChange={uploadImg} id={'file-upload' + info.id} />
        </section>
    )
}