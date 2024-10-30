import detailedProject from "@/styles/projectDetailed.module.css";

export default function BugBlock({draggable, onDragStart,item }) {
const priorityBackground = {
borderRadius:'3px',
}

function refreshPage() {
    window.location.reload(false);
  }

function generateStatusBar(status) {
    const statusColors = {
        High: "#FF2400",  
        Medium: "#FFA500",        
        Low: "#008000",            
        Improvement: "#4682B4",
        'Core Feature': "#1E90FF",
        Bug: "#DC143C",            
        Task: "#8A2BE2",           
        Support: "#FF69B4"         
    };

   return {
    ...priorityBackground,
    backgroundColor: statusColors[status] || statusColors.default,
    };
}



    return(
        <div
        className={detailedProject.bugBlock}
        draggable={draggable}
        onDragStart={onDragStart}>
          <ul>
            <li className={detailedProject.ticketDesc}>{item.description}</li>
            <li className={detailedProject.type} style={generateStatusBar(item.type)}>
              <p>{item.type}</p>
            </li>
            <li className={detailedProject.priority} style={generateStatusBar(item.priority)}>
              <p>{item.priority}</p>
            </li>
            <li>
            <div className={detailedProject.alterTicketDiv}>
              <img src="/icons/edit.png" alt="edit ticket" 
              className={detailedProject.bugBlockIcon}
              on
              />
     </div>
            </li>
          </ul>
      </div>

      
         
    )
}