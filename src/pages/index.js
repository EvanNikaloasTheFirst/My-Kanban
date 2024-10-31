import styles from "@/styles/Home.module.css";
import detailedProject from "@/styles/projectDetailed.module.css";
import PopupModal from "../../components/PopUpModal";
import TicketWindow from "../../components/TicketWindow";
import { useEffect, useState } from "react";
import BugBlock from "@components/BugBlock";
import Navbar from "@components/Navbar";
import Head from "next/head";
export default function Home() {
    const [NotStarted, setNotStarted] = useState([]);
    const [InProgress, setInProgress] = useState([]);
    const [InReview, setInReview] = useState([]);
    const [Completed, setCompleted] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showTicketWindow, setShowTicketWindow] = useState(false);
    const [tempVar, setTempVar] = useState(false); 
    const [beginning, setBeginning] = useState([]);
    const [index, setIndex] = useState(''); 
    const [ticketDesc, setTicketDesc] = useState();
    const [ticketType, setTicketType] = useState();
    const [ticketPriority, setTicketPriority] = useState();
    const [ticketStatus, setTicketStatus] = useState();
    const [ticketId, setTicketId] = useState(false)
    const [filterValue,setFilterValue] = useState()


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


            
                case "In Progress":
                    const NewInprogress = [
                        ...InProgress.slice(0, index), // values up to the removed element
                        ...InProgress.slice(index + 1) // values after the selected element
                        
                    ];
                    setInProgress(NewInprogress);
                    break;
    

                    case "Not Started":
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
                        case "Not Started":
                            notStartedTickets.push(parsedItem);
                            break;
                        case "In Progress":
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

    };
    
    useEffect(() => {
        getAllItems();
    }, []);

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

    const updatedTicketForm = {
        ticketId: ticket.ticketId, // Ensure you have the ticketId
        description: ticket.description,
        type: ticket.type,
        priority: ticket.priority,
        status: endLocation,
    };
        
  try{
     // Loop through local storage to find the matching ticketId
     for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.includes("ticketForm")) {
            const existingTicket = localStorage.getItem(key);
            const ticketData = JSON.parse(existingTicket);
            
            // Check if the ticketId matches
            if (ticketData.ticketId === ticket.ticketId) {
                // Save the updated ticket back to local storage
                localStorage.setItem(key, JSON.stringify(updatedTicketForm));
                break; // Exit the loop once found
            }
        }else{
            alert("Err")
        }
    }
} catch (e) {
    console.log('Error updating ticket:', e);
  } 
};


// updates the tickets status
function handleOnDrop(endLocation) {
    const ticket = tempVar;

    // Makes sure ticket is lost if the ticket is dropped from the home location
    if(endLocation != beginning ){
    // Add the ticket to the respective list
    if (endLocation === "Completed") {
        setCompleted((prev) => [...prev, ticket]);

    } else if (endLocation === "Not Started") {
        setNotStarted((prev) => [...prev, ticket]);
    } 

    else if (endLocation === "In Review") {
        setInReview((prev) => [...prev, ticket]);
    } 

    else if (endLocation === "In Progress") {
        setInProgress((prev) => [...prev, ticket]);
    } 

    updateTicket(endLocation,tempVar)
    deleteFromArr(beginning)
}




   
}

  return (
    <div className={styles.home}>
<Head>
        <title>My Daily Driver</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/MyKanbanLogo.png" />
      </Head>
        <Navbar/>
    <main>
        <div className={detailedProject.detailedPage}>
           <h1>My Daily Driver</h1>
            <div className={detailedProject.ticketsBox} >
            <div className={detailedProject.projectActionBtn}>
            <div className={detailedProject.createTicketBtn}
             onClick={()=> setShowModal(true) }>          
                    Create A Ticket
                </div>

                {/* <div className={detailedProject.createTicketBtn}>          
                   Filter    <br/>
        <select id="type" onChange={(e) => setFilterValue(e.target.value)} className={styles.filterBar}
        aria-label="Select type">

        <option value={ticketPriority}>{ticketPriority}</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
    </select>
                </div> */}
                
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
                            onDrop={(e) => handleOnDrop("Not Started")}
                       
                            onDragOver={handleDragOver}>

                            <h2>Not Started ({NotStarted.length})</h2>
                            <ul>

                            {(NotStarted || []).map((item, index) => (
                                    <li key={index} onClick={() => showTicketWindowPane(item)}>
                                        <BugBlock
                                        draggable
                                        onDragStart={(e) => handleOnDrag(e, "Not Started", item, index)}
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
                            onDrop={(e) => handleOnDrop( "In Progress")}
                            onDragOver={handleDragOver}>
                            <h2>In progress ({InProgress.length})</h2>
                            <ul>

                            {(InProgress || []).map((item, index) => (
                            <li key={index} onClick={() => showTicketWindowPane(item)}>

                            <BugBlock
                            onClick={()=> setShowTicketWindow(true)}
                            draggable
                            onDragStart={(e) => handleOnDrag(e, "In Progress", item, index)}  

                            item={item}/>
                        </li>
))}
                            </ul>
                        </div>
                    </li>

                    <li>
                        <div
                            className={detailedProject.TicketBlock}
                            onDrop={(e) => handleOnDrop("In Review")}
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
                            onDrop={(e) => handleOnDrop("Completed")}
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
