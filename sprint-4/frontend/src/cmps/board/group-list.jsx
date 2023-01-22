import { GroupPreview } from './group-preview'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

export function GroupList({ board }) {
    // return (
    //     <DragDropContext onDragEnd={(result) => console.log('result', result)}>
    //         {(provided, snapchat) => (
    //             <div ref={provided.innerRef}
    //                 {...provided.draggableProps}
    //                 {...provided.dragHandleProps}>

    //                 <section className="group-list">
    //                     <ul>
    //                         <Droppable >
    //                             {board.groups.map((group, idx) => {
    //                                 return (
    //                                     <li key={idx}><GroupPreview group={group} board={board} provided={provided} snapchat={snapchat} /></li>
    //                                 )
    //                             })}
    //                         </Droppable>

    //                     </ul>
    //                 </section>
    //             </div>
    //         )}
    //     </DragDropContext>
    return (

        <section className="group-list">
            <ul>
                {board.groups.map((group, idx) => {
                    return (
                        <li key={idx}><GroupPreview group={group} board={board} /></li>
                    )
                })}

            </ul>
        </section>

    )
}