import { GroupPreview } from './group-preview'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

export function GroupList({ board }) {
    return (

                <DragDropContext onDragEnd={(result) => console.log('result', result)}>
        <section className="group-list">
            <ul>
                    {board.groups.map((group) =>
                    (
                        <Droppable key={group._id} droppableId={group._id}>
                            {(provided, snapchat) => (
                                <div ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}>
                                    <li key={group.id}>
                                        <GroupPreview group={group} board={board} provided={provided} snapchat={snapchat} />
                                    </li>
                                </div>)}
                        </Droppable>
                    )
                    )}
            </ul>
        </section>
                </DragDropContext>
    )
    // return (

    //     <section className="group-list">
    //         <ul>
    //             {board.groups.map((group, idx) => {
    //                 return (
    //                     <li key={idx}><GroupPreview group={group} board={board} /></li>
    //                 )
    //             })}

    //         </ul>
    //     </section>

    // )
}