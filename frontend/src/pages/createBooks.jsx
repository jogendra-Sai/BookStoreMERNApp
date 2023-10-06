import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBooks = () => {
    const [newData, SetnewData] = useState({
        title: "",
        author: "",
        publishYear: ""
    })
    console.log(newData);
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate();
    const handleChange = (e) => {
        let { name, value } = e.target;
        SetnewData({ ...newData, [name]: value })
    }
    const handleSubmit = () => {
        setLoading(true)
        axios.post("http://localhost:5555/books", newData)
            .then(() => {
                setLoading(false);
                navigate('/')
            })
            .catch((error) => {
                setLoading(false);
                alert("An Error happened. Please Check Console");
                console.log(error);
            })
    }
    return (
        <div className='p-4'>
            <BackButton />
            <h1 className=' flex justify-center text-3xl my-4'>Create Book</h1>
            {isLoading ? <Spinner /> : ""}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Title</label>
                    <input
                        type="text"
                        name='title'
                        value={newData.title}
                        onChange={handleChange}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Author</label>
                    <input
                        type="text"
                        name='author'
                        value={newData.author}
                        onChange={handleChange}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
                    <input
                        type="text"
                        name='publishYear'
                        value={newData.publishYear}
                        onChange={handleChange}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleSubmit}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default CreateBooks

