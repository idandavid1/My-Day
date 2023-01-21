import { utilService } from '../services/util.service'
import { BsFillCircleFill } from 'react-icons/bs'

export function ColorPalette({onChangeGroupColor}) {
    const colors = utilService.getColors()
    return (

        <div className='color-palette'>
            {colors.map((color, idx) => (
                <BsFillCircleFill className='color-icon' onClick={() => onChangeGroupColor(color)}
                    key={idx} style={{ color: color }} />
            ))}
        </div>
    )
}