import React, { useEffect, useState } from 'react';
import { getTrainers } from '../../services/trainerService';
import Loader from '../common/Loader';

const TrainerList = () => {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const data = await getTrainers();
                setTrainers(data);
            } catch (err) {
                setError('Failed to fetch trainers');
            } finally {
                setLoading(false);
            }
        };

        fetchTrainers();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Trainer List</h2>
            <ul>
                {trainers.map(trainer => (
                    <li key={trainer.Trainer_ID}>
                        {trainer.Name} - {trainer.Email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrainerList;