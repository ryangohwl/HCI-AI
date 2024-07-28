import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export const UserWhiteboards = () => {
    const location = useLocation();
    const [whiteboards, setWhiteboards] = useState([]); 
    useEffect(() => {
        console.log(location.state.username);

        const fetchWhiteboards = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/whiteboard/${location.state.username}`, {
                    params: {
                        username: location.state.username
                    }
                });
                console.log(response.data.user.whiteboards)
                const whiteboards = await setWhiteboards([response.data.user.whiteboards])
                
            } catch (error) {
                console.error('Error fetching whiteboards:', error);
            }
        };
    

        fetchWhiteboards()
        console.log(whiteboards)
        
        // console.log(`whiteboards:${whiteboards}`)
        

    }, []); // Depend on location.state to re-run the effect when it changes
    
    return null; // Since this seems to be a data-fetching component, it does not render anything.
}

const create_whiteboard = () => {

}