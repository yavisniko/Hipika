import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import "../../less/Landing-styles/land-style.css"

const Landing = () => {
    const blogWords: string[] = ['Blogs', 'Posts']
    let navigate = useNavigate()
    const [wordIndex, setWordIndex] = useState(0)

    useEffect(() => {
        const interval = window.setInterval(() => {
            setWordIndex(wordIndex + 1)
            if(wordIndex >= blogWords.length - 1) setWordIndex(0)
        }, 2000)

        return () => clearInterval(interval)
    })

    return (
        <div className="containerr">
            <div className="start-text">
                <div className="wrapper">
                    <h1>Create your</h1>
                    <h1>{blogWords[wordIndex]}</h1>
                </div>
            </div>
            <div className="land-btns">
                <button onClick={() => navigate('/sign-up')}>Sign Up</button>
                <button onClick={() => navigate('/log-in')}>Log in</button>
            </div>
        </div>
    )
}

export default Landing
