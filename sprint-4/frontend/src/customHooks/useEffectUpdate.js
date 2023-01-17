import { useEffect, useRef } from "react"


export const useEffectUpdate = (callBack, dependencies) => {

    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        callBack()
    }, dependencies)
}