import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTrainerById } from '../../services/trainerService';
import Loader from '../common/Loader';

const TrainerDetails = () => {
    const { id } = useParams();
    const [trainer, setTrainer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrainer = async () => {
            try {
                const data = await getTrainerById(id);
                setTrainer(data);
            } catch (err) {
                setError('Failed to fetch trainer details');
            } finally {
                setLoading(false);
            }
        };

        fetchTrainer();
    }, [id]);

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;

    return (
        <div className="trainer-details">
            <h2>Trainer Details</h2>
            {trainer && (
                <div>
                    <h3>{trainer.Name}</h3>
                    <p><strong>Email:</strong> {trainer.Email}</p>
                    <p><strong>Phone:</strong> {trainer.Phone}</p>
                    <p><strong>Salary:</strong> ${trainer.Salary}</p>
                    <p><strong>Hire Date:</strong> {new Date(trainer.hire_date).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> {trainer.status}</p>
                </div>
            )}
        </div>
    );
};

export default TrainerDetails;