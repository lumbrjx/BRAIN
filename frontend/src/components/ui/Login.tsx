import React, { useState } from 'react';

const LoginComponent = () => {
    const [Username, setUsername] = useState<string>('');
    const [Password, setPassword] = useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // logique ?
    };

    return (
        <div className="w-[450px] bg-white flex justify-center items-center rounded-[10px] p-4 shadow-sm">
            <form onSubmit={handleSubmit}>
                <h2 className="text-TextBlack text-2xl mb-4 text-center font-bold">Login</h2>
                <div className="user mb-2">
                    <label htmlFor="username" className="block text-TextBlack mb-1 font-sans">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        required
                        value={Username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='w-[350px] h-[40px] border border-gray-300 rounded-[10px] px-2 py-1 text-[13px]'
                        placeholder = "XXXXXXXX"
                    />
                </div>
                <div className="password mb-5">
                    <label htmlFor="password" className="block text-TextBlack mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        required
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full h-[40px] border border-gray-300 rounded-[10px] px-2 py-1 text-[13px]'
                        placeholder='**********'
                    />
                </div>
                <button
                    type="submit"
                    className="bg-Gray text-white w-full rounded-[10px] h-[40px] hover:bg-gray-600 font-bold"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default LoginComponent;
