import axios from 'axios';

// Создаем экземпляр axios с настройками
const axiosInstance = axios.create({
    baseURL: '/auth',
    validateStatus: function (status) {
        return status >= 200 && status < 500;
    },
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Добавляем перехватчик для обработки ошибок
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.error('Request error:', error);
        if (error.code === 'ERR_NETWORK') {
            console.error('Network error - make sure the backend is running and accessible');
        }
        return Promise.reject(error);
    }
);

const login = async (username, password) => {
    try {
        const response = await axiosInstance.post('/login', {
            username,
            password
        });
        
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            return response.data;
        }
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error.response?.data || 'Произошла ошибка при входе';
    }
};

const register = async (username, email, password) => {
    try {
        const response = await axiosInstance.post('/register', {
            username,
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        if (error.response?.status === 409) {
            throw 'Пользователь с таким именем уже существует';
        }
        throw error.response?.data || 'Произошла ошибка при регистрации. Пожалуйста, попробуйте позже.';
    }
};

const logout = () => {
    localStorage.removeItem('token');
};

const getToken = () => {
    return localStorage.getItem('token');
};

const isAuthenticated = () => {
    return !!getToken();
};

export {
    login,
    register,
    logout,
    getToken,
    isAuthenticated
}; 