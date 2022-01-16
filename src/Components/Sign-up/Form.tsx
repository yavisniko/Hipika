import axios from 'axios'
import { ChangeEvent, FC, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { validateEmail } from "../../utils/validateEmail"
import { useNavigate, Link } from 'react-router-dom'

interface formProps {
    name: string,
    surname: string,
    password: string,
    email: string
    image?: string,
    repeatpass?: string,
    path: string
}

const Form: FC<{showNavbar: () => void}> = ({showNavbar}) => {
    const [form, setForm] = useState<formProps>({
        name: '',
        surname: "",
        email: '',
        path: '',
        password: "",
        repeatpass: "",
        image: '',
    })
    let navigate = useNavigate()
    const fileId: string = String(new Date().getTime())
    const [fileHandler, setFileHandler] = useState<File | null>(null)

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const name: string = e.target.name
        const value: string = e.target.value

        setForm({...form, [name]: value})
    }


    const fileUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const fileSize: number = parseFloat(((e.target.files![0].size / 1024) /1024).toFixed(3))
    
    if(fileSize > 5){
      alert("File size is higher than 5Mb please choose somthing lower")
    }else {
        const imageToURL: string = URL.createObjectURL(e.target.files![0])
        setForm({...form, image: imageToURL, path: `${fileId}-${e.target.files![0].name}`})
        setFileHandler(e.target.files![0])
    }
}


const formHandler = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

        const formValues = Object.values(form).slice(2)

        for(let i = 0; i < formValues.length; i++){
            if(formValues[i].trim() === ""){
                alert("Please fill blank fields")
                break
            }
        }

        if(validateEmail(form.email) === false){
            alert('Please Input Email')
        }else if(form.password !== form.repeatpass){
            alert("Repeated password doesn't match what you inputed")
        }else if(form.password.length < 8){
            alert("Your password mustn't be less than 8 charcters")
        }else {            

            const fileData: any = new FormData()
            fileData.append('file', fileHandler)

            await axios.post('http://localhost:5000/signup', form)
            .then((res) => {
                showNavbar()
                localStorage.setItem('authToken', JSON.stringify(res.data._id))              
                if(res.status === 200){
                    navigate('/dashboard')
                }
            })
            .catch(err => console.log(err))

            await axios.post(`http://localhost:5000/upload/avatar/${form.path.split('-')[0]}`, fileData)
            .then((result) => console.log("success"))
            .catch(err => console.log(`Some error detected`, err))

        }
    }

    return (
        <div className="form-wrapper" style={{position:"relative"}}>
            <div className="photo-upload-wrapper">
                <div className="photo-circle">
                    <input type="file" accept="image/*" onChange={fileUploadHandler}/>
                    {
                        form.image?.trim() === "" ?
                        <>
                            <FontAwesomeIcon icon={faCamera} size={'3x'} color={'#FFF'}/>
                            <p style={{color: "#FFF"}}>Upload Photo</p>
                        </>:
                        <img src={form.image} alt="" />
                    }
                </div>
            </div>
            <form className="inputs" onSubmit={formHandler}>
                <input type="text" placeholder='Name' value={form.name} onChange={inputHandler} name="name"/>
                <input type="text" placeholder='Surname'value={form.surname} onChange={inputHandler} name="surname"/>
                <input type="text" placeholder="Email" value={form.email} onChange={inputHandler} name="email"/>
                <input type="password" placeholder='Password' value={form.password} onChange={inputHandler} name="password"/>
                <input type="password" placeholder='Repeat Password' value={form.repeatpass} onChange={inputHandler} name="repeatpass"/>
            <div className="button-wrapper">
                <button type="submit" >Sign up</button>
            </div>
            </form>
            <Link to="/log-in">Already have account?</Link>
        </div>
    )
}

export default Form
