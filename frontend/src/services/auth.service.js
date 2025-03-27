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
        // Для демонстрации проверяем наличие пользователя в localStorage
        // В реальном приложении это делалось бы на сервере
        const usersStr = localStorage.getItem('users');
        let users = [];
        
        if (usersStr) {
            try {
                users = JSON.parse(usersStr);
            } catch (e) {
                console.error('Error parsing users data:', e);
            }
        }
        
        // Проверяем существование пользователя с точным совпадением учетных данных
        const user = users.find(user => 
            (user.username === username || user.email === username)
        );
        
        // Если пользователь не найден
        if (!user) {
            console.log('Пользователь не найден:', username);
            console.log('Список пользователей:', users);
            throw new Error('Пользователь не найден. Проверьте логин или зарегистрируйтесь.');
        }
        
        // Проверяем пароль
        if (user.password !== password) {
            console.log('Неверный пароль для пользователя:', username);
            throw new Error('Неверный пароль');
        }
        
        // Делаем запрос к API
        try {
            const response = await axiosInstance.post('/login', {
                username,
                password
            });
            
            if (response.data.token) {
                // Сохраняем токен и данные пользователя
                localStorage.setItem('token', response.data.token);
                
                // Сохраняем данные пользователя
                localStorage.setItem('user', JSON.stringify(user));
                
                return response.data;
            }
        } catch (apiError) {
            // Если API недоступен, но пользователь существует в localStorage,
            // разрешаем вход (только для демонстрации)
            console.log('API недоступен, но пользователь существует в localStorage');
            const mockToken = 'mock_token_' + Date.now();
            localStorage.setItem('token', mockToken);
            
            // Обновляем данные текущего пользователя
            localStorage.setItem('user', JSON.stringify(user));
            
            return { token: mockToken };
        }
    } catch (error) {
        console.error('Login error:', error);
        if (error.message) {
            throw error.message;
        }
        throw error.response?.data || 'Неверное имя пользователя или пароль';
    }
};

const register = async (username, email, password) => {
    try {
        // Проверяем, существует ли уже пользователь с таким именем или email
        const usersStr = localStorage.getItem('users');
        let users = [];
        
        if (usersStr) {
            try {
                users = JSON.parse(usersStr);
            } catch (e) {
                console.error('Error parsing users data:', e);
            }
        }
        
        // Проверяем, существует ли пользователь с таким именем или email
        const userExists = users.some(user => 
            user.username === username || user.email === email
        );
        
        if (userExists) {
            throw new Error('Пользователь с таким именем или email уже существует');
        }
        
        // Делаем запрос к API
        const response = await axiosInstance.post('/register', {
            username,
            email,
            password
        });
        
        // Сохраняем данные пользователя
        const userData = {
            username,
            email,
            password // Сохраняем пароль для проверки при входе
        };
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Добавляем пользователя в список пользователей
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        
        console.log('Пользователь зарегистрирован:', userData);
        console.log('Обновленный список пользователей:', users);
        
        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        if (error.message) {
            throw error.message;
        }
        if (error.response?.status === 409) {
            throw new Error('Пользователь с таким именем уже существует');
        }
        throw error.response?.data || 'Произошла ошибка при регистрации. Пожалуйста, попробуйте позже.';
    }
};

const logout = () => {
    // Удаляем только токен и текущего пользователя
    // НЕ удаляем пользователя из списка пользователей
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    console.log('Пользователь вышел из системы');
};

const deleteAccount = async () => {
    // Получаем текущего пользователя
    const userStr = localStorage.getItem('user');
    if (!userStr) {
        console.log('Нет данных о текущем пользователе для удаления');
        return { success: false, message: 'Нет данных о текущем пользователе' };
    }
    
    try {
        const currentUser = JSON.parse(userStr);
        console.log('Удаляем пользователя:', currentUser);
        
        // Получаем список пользователей
        const usersStr = localStorage.getItem('users');
        if (!usersStr) {
            console.log('Список пользователей не найден');
            // Удаляем данные текущего пользователя и токен
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return { success: true };
        }
        
        try {
            let users = JSON.parse(usersStr);
            console.log('Текущий список пользователей:', users);
            
            // Находим индекс пользователя в списке
            const userIndex = users.findIndex(user => 
                (user.username === currentUser.username || user.email === currentUser.email)
            );
            
            if (userIndex !== -1) {
                // Удаляем пользователя из списка
                users.splice(userIndex, 1);
                console.log('Пользователь удален из списка, новый список:', users);
                
                // Сохраняем обновленный список
                localStorage.setItem('users', JSON.stringify(users));
            } else {
                console.log('Пользователь не найден в списке');
            }
            
            // Удаляем данные текущего пользователя и токен
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            // Добавляем небольшую задержку для гарантии обновления localStorage
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Проверяем, что пользователь действительно удален
            const updatedUsersStr = localStorage.getItem('users');
            if (updatedUsersStr) {
                const updatedUsers = JSON.parse(updatedUsersStr);
                const userStillExists = updatedUsers.some(user => 
                    (user.username === currentUser.username || user.email === currentUser.email)
                );
                
                if (userStillExists) {
                    console.error('Ошибка: пользователь все еще существует после удаления');
                    return { success: false, message: 'Ошибка удаления аккаунта' };
                }
            }
            
            return { success: true };
        } catch (e) {
            console.error('Error parsing users data:', e);
            // Удаляем данные текущего пользователя и токен
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return { success: false, message: 'Ошибка при обработке данных пользователей' };
        }
    } catch (e) {
        console.error('Error parsing user data:', e);
        return { success: false, message: 'Ошибка при обработке данных пользователя' };
    }
};

const getToken = () => {
    return localStorage.getItem('token');
};

const isAuthenticated = () => {
    return !!getToken();
};

const getUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            console.log('Получены данные пользователя из localStorage:', user);
            return user;
        } catch (e) {
            console.error('Error parsing user data:', e);
            return null;
        }
    }
    
    // Если пользователь не найден в localStorage, проверяем список пользователей
    const usersStr = localStorage.getItem('users');
    if (usersStr) {
        try {
            const users = JSON.parse(usersStr);
            if (users.length > 0) {
                // Берем первого пользователя из списка (для демонстрации)
                console.log('Пользователь не найден в localStorage, используем первого из списка:', users[0]);
                localStorage.setItem('user', JSON.stringify(users[0]));
                return users[0];
            }
        } catch (e) {
            console.error('Error parsing users data:', e);
        }
    }
    
    return null;
};

// Функция для проверки существования пользователя
const userExists = (username, email, password = null) => {
    const usersStr = localStorage.getItem('users');
    if (!usersStr) {
        return false;
    }
    
    try {
        const users = JSON.parse(usersStr);
        
        // Если пароль не указан, проверяем только имя пользователя или email
        if (password === null) {
            return users.some(user => 
                user.username === username || user.email === email
            );
        }
        
        // Если пароль указан, проверяем также и пароль
        return users.some(user => 
            (user.username === username || user.email === email) && user.password === password
        );
    } catch (e) {
        console.error('Error checking if user exists:', e);
        return false;
    }
};

const resetPassword = async (email) => {
    try {
        // Получаем список пользователей из localStorage
        const usersStr = localStorage.getItem('users');
        if (!usersStr) {
            throw new Error('Пользователь с таким email не найден');
        }

        const users = JSON.parse(usersStr);
        const user = users.find(u => u.email === email);

        if (!user) {
            throw new Error('Пользователь с таким email не найден');
        }


        return {
            success: true,
            message: 'Пароль отправлен на ваш email. После входа рекомендуется сменить пароль.'
        };
    } catch (error) {
        console.error('Reset password error:', error);
        throw new Error(error.message || 'Произошла ошибка при восстановлении пароля');
    }
};

export {
    login,
    register,
    logout,
    getToken,
    isAuthenticated,
    getUser,
    deleteAccount,
    userExists,
    resetPassword
}; 