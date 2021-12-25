import axios from 'axios'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { validateEmail } from "../../utils/validateEmail"
import { useNavigate, Link } from 'react-router-dom'

interface formProps {
    name: string,
    surname: string,
    password: string,
    email: string
    image: string,
    repeatpass?: string
}

const Form = () => {
    const [form, setForm] = useState<formProps>({
        image: '',
        name: '',
        surname: "",
        email: '',
        password: "",
        repeatpass: "",
    })
    let navigate = useNavigate()

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const name: string = e.target.name
        const value: string = e.target.value

        setForm({...form, [name]: value})
    }

      const getBase64 = (file: File, cb: (arg: string | ArrayBuffer | null) => void) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        cb(reader.result)
    };
    reader.onerror = (error) => {
        console.log('Error: ', error);
    };
  }

  const fileUploadHandler = (e: any) => {
    const fileSize: number = parseFloat(((e.target.files![0].size / 1024) /1024).toFixed(3))
    
    if(fileSize > .200){
      alert("File size is higher than 200Kb please choose somthing lower")
    }else getBase64((e.target.files![0]), (result: any): void => setForm({...form, image: result}));
  }

    const formHandler = (e: React.FormEvent): void => {
        e.preventDefault()

        const formValues = Object.values(form).slice(1)

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
            axios.post('http://localhost:5000/signup', form)
            .then((res) => {
                localStorage.setItem('authToken', JSON.stringify(res.data["_id"]))              
                if(res.status === 200){
                    navigate('/dashboard')
                }
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <div className="form-wrapper" style={{position:"relative"}}>
            <div className="photo-upload-wrapper">
                <div className="photo-circle">
                    <input type="file" accept="image/*" onChange={fileUploadHandler}/>
                    {
                        form.image.trim() === "" ?
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
                <button type="submit">Sign up</button>
            </div>
            </form>
            <Link to="/log-in">Already have account?</Link>
        </div>
    )
}

export default Form
