import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import sessionService from '../../services/sessionService';
import memberService from '../../services/memberService';

const SessionBooking = () => {
    const { sessionId } = useParams();
    const [sessionDetails, setSessionDetails] = useState(null);
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchSessionDetails = async () => {
            try {
                const response = await sessionService.getSessionById(sessionId);
                setSessionDetails(response.data);
            } catch (error) {
                console.error('Error fetching session details:', error);
            }
        };

        const fetchMembers = async () => {
            try {
                const response = await memberService.getAllMembers();
                setMembers(response.data);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchSessionDetails();
        fetchMembers();
    }, [sessionId]);

    const handleBooking = async () => {
        if (!selectedMember) {
            setMessage('Please select a member to book the session.');
            return;
        }

        try {
            await sessionService.bookSession(sessionId, selectedMember);
            setMessage('Session booked successfully!');
        } catch (error) {
            console.error('Error booking session:', error);
            setMessage('Failed to book the session. Please try again.');
        }
    };

    return (
        <div>
            <h2>Book Session</h2>
            {sessionDetails && (
                <div>
                    <h3>{sessionDetails.type} on {sessionDetails.date}</h3>
                    <p>Duration: {sessionDetails.duration} minutes</p>
                    <p>Trainer: {sessionDetails.trainerName}</p>
                    <p>Current Participants: {sessionDetails.currentParticipants}/{sessionDetails.maxCapacity}</p>
                </div>
            )}
            <div>
                <label>Select Member:</label>
                <select value={selectedMember} onChange={(e) => setSelectedMember(e.target.value)}>
                    <option value="">--Select Member--</option>
                    {members.map(member => (
                        <option key={member.Member_id} value={member.Member_id}>
                            {member.Name}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={handleBooking}>Book Session</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SessionBooking;