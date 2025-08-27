
import axios from 'axios';
import { BASE_URL } from '../helpers/constant';



interface UserProfile {
    email: string;
    selectedCourses: string[];
}

export const getUserProfile = async (): Promise<UserProfile> => {
    try {
        const token = localStorage.getItem('authToken'); 

        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await axios.get(BASE_URL + '/users/me', {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });

        return response.data;
    } catch (error: any) {
        let message = 'Failed to fetch user profile:';
        if (error.response) {
            message += error.response.data.message;
        } else {
            message += error.message;
        }
        console.error(message);
        throw new Error(message);
    }
};