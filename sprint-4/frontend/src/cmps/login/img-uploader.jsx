import { useState } from 'react'
import { uploadService } from '../../services/upload.service'
const guest = "https://res.cloudinary.com/du63kkxhl/image/upload/v1675013009/guest_f8d60j.png"

export function ImgUploader({ onUploaded = null }) {
  const [imgData, setImgData] = useState({
    imgUrl: null,
    height: 500,
    width: 500,
  })
  const [isUploading, setIsUploading] = useState(false)

  async function uploadImg(ev) {
    setIsUploading(true)
    const { secure_url, height, width } = await uploadService.uploadImg(ev)
    setImgData({ imgUrl: secure_url, width, height })
    setIsUploading(false)
    onUploaded && onUploaded(secure_url)
  }

  function getUploadLabel() {
    if (imgData.imgUrl) return 'Upload Another?'
    return isUploading ? 'Uploading....' : 'Upload a profile picture'
  }

  // TODO: fix all
  return (
    <div className="upload-preview">
      <label htmlFor="imgUpload">
        {getUploadLabel()}
        {!imgData.imgUrl && <img className="guest-img" src={guest} style={{ maxWidth: '200px', float: 'right' }} alt="" />}
        {imgData.imgUrl && <img className="user-img" src={imgData.imgUrl} style={{ maxWidth: '100px', float: 'right' }} alt="" />}
      </label>
      <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
    </div>
  )
}