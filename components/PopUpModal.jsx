import styles from "@/styles/projectDetailed.module.css";
import { useState } from "react";

export default function PopupModal({ onClose }) {
    const [type, setType] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
    const [ticketId, setTicketId] = useState('');


    function refreshPage() {
        window.location.reload(false);
      }
        const generateUniqueId = () => {
    let uniqueId;
    const existingKeys = Object.keys(localStorage);

    do {
        // Generate a random ID (you can customize this logic)
        uniqueId = `ticket_${Math.random().toString(36).substr(2, 9)}`;
    } while (existingKeys.includes(uniqueId)); // Check for duplicates

    return uniqueId;
};

    const handleSubmit = async (e) => {
        e.preventDefault();

        const ticketForm = {
            type: type,
            description: description,
            priority: priority,
            status: status,
            ticketId: generateUniqueId()
        };



        // Basic validation
        if (!type || !priority || !status) {
            alert("Please select a value for all fields.");
            return;
        }

        const id = Date.now();
        localStorage.setItem(`ticketForm_${id}`, JSON.stringify(ticketForm));

        // Reset form fields
        setType('');
        setPriority('');
        setStatus('');
        setDescription('');

        // Close the modal after submitting the form
        onClose();
        refreshPage();
    };

    return (
        <div className={styles.popupBox}>
            <h1>Create a ticket</h1>
            
            <form className={styles.ticketForm} onSubmit={handleSubmit} encType="multipart/form-data">
                <label htmlFor="description" className={styles.createTicketLabel}>Description:</label>
                <textarea
                    name="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className={styles.inputDesc}
                />

                <label htmlFor="type" className={styles.createTicketLabel}>Type:</label>
                <select 
                    id="type" 
                    onChange={(e) => setType(e.target.value)} 
                    className={styles.status} 
                    aria-label="Select type"
                    defaultValue="" // Ensure the default selected value is empty
                >
                    <option value="" disabled>Select type</option>
                    <option value="Bug">Bug</option>
                    <option value="Improvement">Improvement</option>
                    <option value="Core Feature">Core Feature</option>
                    <option value="Task">Task</option>
                    <option value="Support">Support</option>
                </select>

                <label htmlFor="Priority" className={styles.createTicketLabel}>Priority:</label>
                <select 
                    id="Priority" 
                    onChange={(e) => setPriority(e.target.value)}
                    className={styles.status}
                    defaultValue="" // Ensure the default selected value is empty
                >
                    <option value="" disabled>Select priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

                <label htmlFor="Status" className={styles.createTicketLabel}>Status:</label>
                <select 
                    id="Status" 
                    onChange={(e) => setStatus(e.target.value)}
                    className={styles.status}
                    defaultValue="" // Ensure the default selected value is empty
                >
                    <option value="" disabled>Select status</option>
                    <option value="In progress">In progress</option>
                    <option value="Not started">Not Started</option>
                    <option value="Completed">Completed</option>
                    <option value="In Review">In review</option>
                    <option value="Feedback">Feedback</option>
                </select>

                <div className={styles.divOfButtons}>
                    <button type="submit" className={styles.submitTicketBtn}>Create</button>
                    <button type="button" className={styles.closeModal} onClick={onClose}>Close</button>
                </div>
            </form>
            <br />
        </div>
    );
}
