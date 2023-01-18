import { useState, useEffect, useRef } from 'react'
import { GroupPreview } from './group-preview.jsx'

export function GroupList({ board }) {
    console.log(board)
    return (
        <section className="group-list">
        
            <ul>
                {board.groups.map(group => {
                    return <li key={group.id}><GroupPreview group={group} /></li>
                })}
            </ul>
        </section>
    )
}