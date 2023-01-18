import { MainSidebar } from "../cmps/sidebar/main-sidebar";
import { WorkspaceSidebar } from "../cmps/sidebar/workspace-sidebar";



export function BoardDetails() {

    return (
        <section className="board-details">
            <MainSidebar />
            < WorkspaceSidebar />    
        </section>
    )
}