import styles from "@/styles/Home.module.css";
import detailedProject from "@/styles/projectDetailed.module.css";
import PopupModal from "@/styles/components/PopUpModal";
import TicketWindow from "@/styles/components/TicketWindow";
import { useEffect, useState } from "react";
import BugBlock from "@components/BugBlock";
import Navbar from "@components/Navbar";

export default function Home() {
    const [NotStarted, setNotStarted] = useState([]);
    const [InProgress, setInProgress] = useState([]);
    const [InReview, setInReview] = useState([]);
    const [Completed, setCompleted] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showTicketWindow, setShowTicketWindow] = useState(false);
    const [tempVar, setTempVar] = useState(false); 
    const [beginning, setBeginning] = useState([]);
    const [index, setIndex] = useState(''); // Stores index of the ticket selected


    const [ticketDesc, setTicketDesc] = useState();
    const [ticketType, setTicketType] = useState();
    const [ticketPriority, setTicketPriority] = useState();
    const [ticketStatus, setTicketStatus] = useState();
    const [ticketId, setTicketId] = useState(false)
    const [parentID,setParentID] = useState('')


    const [refresh, setRefresh] = useState(false);



   
    const focus = {
        filter: 'blur(2px)',
    };

    const completedStyle = {
        textDecoration: 'line-through'
    }

    function showTicketWindowPane(item){
        setTicketDesc(item.description)
        setTicketType(item.type)
        setTicketPriority(item.priority)
        setTicketStatus(item.status)
        setTicketId(item.ticketId)
       setShowTicketWindow(true)
    }
   

    // updates the tickets in each array (Ticket Block)
    function deleteFromArr(arrayName){
        switch(arrayName){

            case "Completed":
                const newCompletedArr = [
                    ...Completed.slice(0, index), // values up to the removed element
                    ...Completed.slice(index + 1) // values after the selected element
                    
                ];
                setCompleted(newCompletedArr);
                break;


            
                case "In progress":
                    const NewInprogress = [
                        ...InProgress.slice(0, index), // values up to the removed element
                        ...InProgress.slice(index + 1) // values after the selected element
                        
                    ];
                    setInProgress(NewInprogress);
                    break;
    

                    case "Not started":
                    const NewNotStarted = [
                        ...NotStarted.slice(0, index), // values up to the removed element
                        ...NotStarted.slice(index + 1) // values after the selected element
                        
                    ];
                    setNotStarted(NewNotStarted);
                    break;

                    case "In Review":
                        const NewInReview = [
                            ...InReview.slice(0, index), // values up to the removed element
                            ...InReview.slice(index + 1) // values after the selected element
                            
                        ];
                        setInReview(NewInReview);
                        break;
        }
    }

    const getAllItems = () => {
        if (typeof window !== "undefined") { // Check if we're in a browser
            const items = {};
            const notStartedTickets = [];
            const inProgressTickets = [];
            const inReviewTickets = [];
            const completedTickets = [];
    
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
    
                if (key && key.includes("ticketForm")) {
                    const item = localStorage.getItem(key);
                    const parsedItem = JSON.parse(item);
                    items[key] = parsedItem;
    
                    // Categorize tickets based on their status
                    switch (parsedItem.status) {
                        case "Not started":
                            notStartedTickets.push(parsedItem);
                            break;
                        case "In progress":
                            inProgressTickets.push(parsedItem);
                            break;
                        case "In Review":
                            inReviewTickets.push(parsedItem);
                            break;
                        case "Completed":
                            completedTickets.push(parsedItem);
                            break;
                        default:
                            break;
                    }
                }
            }
    
            // Update state only once after categorization
            setNotStarted(notStartedTickets);
            setInProgress(inProgressTickets);
            setInReview(inReviewTickets);
            setCompleted(completedTickets);
        }
    };
    
    // Call getAllItems in useEffect
    useEffect(() => {
        getAllItems();
    }, [refresh]);

    // }, []); // Empty dependency array to run only on mount


  function handleDragOver(e) {
    e.preventDefault();
}

function handleOnDrag(e,start,value,index) {
    e.dataTransfer.setData('ticket', value);
    setTempVar(value)
    setBeginning(start)
    setIndex(index)
}

const updateTicket = async (endLocation,ticket) => {

        
    const ticketForm = {
        "description":ticket.description,
        "type":ticket.type,
        "priority":ticket.priority,
        "assigned":ticket.assigned,
        "assignee":ticket.assignee,
        "projectId":ticket.projectId,
        "status":endLocation
    }
        ticket.status = endLocation
    
};


// updates the tickets status
function handleOnDrop(e, endLocation) {
    const ticket = tempVar;

    // Makes sure ticket is lost if the ticket is dropped from the home location
    if(endLocation != beginning ){
    // Add the ticket to the respective list
    if (endLocation === "Completed") {
        setCompleted((prev) => [...prev, ticket]);

    } else if (endLocation === "Not started") {
        setNotStarted((prev) => [...prev, ticket]);
    } 

    else if (endLocation === "In Review") {
        setInReview((prev) => [...prev, ticket]);
    } 

    else if (endLocation === "In progress") {
        setInProgress((prev) => [...prev, ticket]);
    } 

    updateTicket(endLocation,tempVar)
    deleteFromArr(beginning)
}




   
}

  return (
    <div className={styles.home}>
        <Navbar/>
    <main>
        <div className={detailedProject.detailedPage}>
           <h1>My Kanban</h1>
            <div className={detailedProject.ticketsBox} >
            <div className={detailedProject.projectActionBtn}>
            <div className={detailedProject.createTicketBtn}
             onClick={()=> setShowModal(true) }>          
                    Create A Ticket
                </div>
                
                {showModal && 
                    <PopupModal  onClose={() => setShowModal(false)} />
                    
                    }  
                    

                   <div className={detailedProject.editTicketPane}>
                   {showTicketWindow && 
                     <TicketWindow 
                     ticketDescription={ticketDesc}
                     ticketType={ticketType}
                     ticketPriority={ticketPriority}
                     ticketStatus={ticketStatus}
                         ticketId={ticketId}
                         projectID={parentID} // If needed, ensure this is correctly set

                         onClose={() => {
                             setShowTicketWindow(false);
                             setRefresh(true);
                             

                         }}
                     />
                    }  
                   </div>



               
                
            </div>
            <ul className={detailedProject.viewKanban} style={showModal  || showTicketWindow ? focus : {}}>
                    <li>
                        <div
                            className={detailedProject.TicketBlock}
                            onDrop={(e) => handleOnDrop(e, "Not started")}
                       
                            onDragOver={handleDragOver}>

                            <h2>Not Started ({NotStarted.length})</h2>
                            <ul>

                            {(NotStarted || []).map((item, index) => (
                                    <li key={index} onClick={() => showTicketWindowPane(item)}>
                                        <BugBlock
                                        draggable
                                        onDragStart={(e) => handleOnDrag(e, "Not started", item, index)}
                                        item={item}
                                    />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div
                            className={detailedProject.TicketBlock}
                            onDrop={(e) => handleOnDrop(e, "In progress")}
                            onDragOver={handleDragOver}>
                            <h2>In progress ({InProgress.length})</h2>
                            <ul>

                            {(InProgress || []).map((item, index) => (
                            <li key={index} onClick={() => showTicketWindowPane(item)}>

                            <BugBlock
                            onClick={()=> setShowTicketWindow(true)}
                            draggable
                            onDragStart={(e) => handleOnDrag(e, "In progress", item, index)}  

                            item={item}/>
                        </li>
))}
                            </ul>
                        </div>
                    </li>

                    <li>
                        <div
                            className={detailedProject.TicketBlock}
                            onDrop={(e) => handleOnDrop(e, "In Review")}
                            onDragOver={handleDragOver}
                        >
                            <h2>In Review ({InReview.length})</h2>
                            <ul className={detailedProject.scrollableList}>

                            {(InReview || []).map((item, index) => (
                            <li key={index} onClick={() => showTicketWindowPane(item)}>
                                <BugBlock
                                style={completedStyle} 
                                onClick={()=> setShowTicketWindow(true)}
                                draggable
                                onDragStart={(e) => 
                                handleOnDrag(e, "In Review", item,index)} item={item} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>

                    <li>
                        <div
                            className={detailedProject.TicketBlock}
                            onDrop={(e) => handleOnDrop(e, "Completed")}
                            onDragOver={handleDragOver}>
                            <h2>Completed ({Completed.length})</h2>
                         <ul className={detailedProject.scrollableList}>

                         {(Completed || []).map((item, index) => (
                       <li key={index} onClick={() => showTicketWindowPane(item)}>
                                    <BugBlock
                                    style={completedStyle}
                                    onClick={()=> setShowTicketWindow(true)}
                                    draggable
                                    onDragStart={(e) => handleOnDrag(e, "Completed" ,item,index)} 
                                    item={item}
                                    
                                    />
                                    </li>
                                ))}
                            </ul>
                            
                        </div>
                    </li>
                </ul>

                
            </div>
            
        </div>
        
    </main>

</div>
  );
}
