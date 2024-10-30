import styles from "@/styles/ticket.module.css";
import BugBlockStyles from "@/styles/projectDetailed.module.css";
import { useState } from "react";

export default function TicketWindow({onClose, ticketDescription,ticketType,ticketPriority,ticketStatus, ticketId,projectID}){

    const [description,setDescription] = useState(ticketDescription || '')
    const [type,setType] = useState(ticketType || '')
    const [priority,setPriority] = useState(ticketPriority || '')
    const [status,setStatus] = useState(ticketStatus || '')
    const [localTicketId, setLocalTicketId] = useState(ticketId || ''); // Renamed the state variable

    function refreshPage() {
        window.location.reload(false);
      }
      
      const updateTicket = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            let ticketFound = false;
    
            // Create a new ticket object with updated values
            const updatedTicketForm = {
                ticketId: localTicketId, // Ensure you have the ticketId
                description: description,
                type: type,
                priority: priority,
                status: status,
            };

            console.log(updatedTicketForm)
    
            // Loop through local storage to find the matching ticketId
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.includes("ticketForm")) {
                    const existingTicket = localStorage.getItem(key);
                    const ticketData = JSON.parse(existingTicket);
                    
                    // Check if the ticketId matches
                    if (ticketData.ticketId === localTicketId) {
                        // Save the updated ticket back to local storage
                        localStorage.setItem(key, JSON.stringify(updatedTicketForm));
                        refreshPage()
                        
                    }
                }
            }
    
            if (!ticketFound) {
                console.log("Ticket not found");
            } else {
                console.log("Ticket updated successfully!"); // Optional success message
            }
        } catch (e) {
            console.log('Error updating ticket:', e);
        } finally {
            onClose(); // Close the modal/window
        }
    };
    
    
    


    const deleteTicket = async () => {
        // If confirmed, proceed to delete
        if (window.confirm(`Are you sure you want to delete the ticket with ID: ${ticketId}?`)) {
            try {
                // Loop through local storage to find and delete the ticket
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.includes("ticketForm")) {
                        const item = localStorage.getItem(key);
                        const parsedItem = JSON.parse(item);
                        // Check if the ticketId matches
                        if (parsedItem.ticketId === localTicketId) { // Ensure you're using the correct property
                            localStorage.removeItem(key);
                            break; // Exit the loop once the ticket is found and deleted
                        }
                    }
                }
                refreshPage();
            } catch (error) {
                console.log('Error:', error);
            }
        }
    };
    

   

    return (
        <div className={styles.editTicketBlock}>
       <form className={styles.editTicket} onSubmit={updateTicket}>
    <label htmlFor="description" className={styles.labels}>Description:</label>
    <textarea
        name="description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.description}
        required
    />

    <label htmlFor="type" className={styles.labels}>Type:</label>
    <select
        id="type"
        onChange={(e) => setType(e.target.value)}
        className={styles.status}
        value={type}
        aria-label="Select type"
    >
        <option value="" disabled>Select Type</option>
        <option value={ticketType}>{ticketType}</option>
        <option value="Bug">Bug</option>
        <option value="Improvement">Improvement</option>
        <option value="Core Feature">Core Feature</option>
        <option value="Task">Task</option>
        <option value="Support">Support</option>
    </select>

    <label htmlFor="Priority" className={styles.labels}>Priority:</label>
    <select
        id="Priority"
        onChange={(e) => setPriority(e.target.value)}
        className={styles.status}
        value={priority}
    >
        <option value="" disabled>Select Priority</option>
        <option value={ticketPriority}>{ticketPriority}</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
    </select>

    <label htmlFor="Status" className={styles.labels}>Status:</label>
    <select
        id="Status"
        onChange={(e) => setStatus(e.target.value)}
        className={styles.status}
        value={status}
    >
        <option value="" disabled>Select Status</option>
        <option value={ticketStatus}>{ticketStatus}</option>
        <option value="In progress">In Progress</option>
        <option value="Not started">Not Started</option>
        <option value="Completed">Completed</option>
        <option value="In Review">In Review</option>
        <option value="Feedback">Feedback</option>
    </select>

    <div className={styles.divOfButtons}>
        <ul>
            <li>
                <button type="submit" className={styles.submitTicketBtn} onClick={updateTicket}>Update</button>
            </li>
            <li>
                <button type="button" className={styles.closeModal} onClick={deleteTicket}>Delete</button>
            </li>
            <li>
                <button type="button" className={styles.minimizeModal} onClick={onClose}>X</button>
            </li>
        </ul>
    </div>
</form>


        
                            

      </div>
    )
}