import React, { useState, ChangeEvent } from "react"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import { Link, useNavigate } from "react-router-dom"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider, createMuiTheme } from "@mui/material/styles"
import { makeStyles } from "@mui/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera } from "@fortawesome/free-solid-svg-icons"
import "../../less/Signup-styles/style.css"
import { validateEmail } from "../../utils/validateEmail"
import axios from "axios"

import "../../less/Signup-styles/style.css"

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

interface formProps {
  name: string
  surname: string
  password: string
  email: string
  image?: string
  repeatpass?: string
  path: string
}

const useStyles = makeStyles({
  circle: {
    height: "200px",
    width: "200px",
    borderRadius: "50%",
    border: "1px solid #5136C2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  }
})

const theme = createMuiTheme({
  palette: {
    background: {
      //@ts-ignore
      xs: "red",
      sm: "blue",
      md: "green"
    }
  }
});

const SignUp = () => {
  const [form, setForm] = useState<formProps>({
    name: "",
    surname: "",
    email: "",
    path: "",
    password: "",
    repeatpass: "",
    image: "",
  })
  let navigate = useNavigate()
  const fileId: string = String(new Date().getTime())
  const [fileHandler, setFileHandler] = useState<File | null>(null)

  const fileUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const fileSize: number = parseFloat(
      (e.target.files![0].size / 1024 / 1024).toFixed(3)
    )

    if (fileSize > 5) {
      alert("File size is higher than 5Mb please choose somthing lower")
    } else {
      const imageToURL: string = URL.createObjectURL(e.target.files![0])
      setForm({
        ...form,
        image: imageToURL,
        path: `${fileId}-${e.target.files![0].name}`,
      })
      setFileHandler(e.target.files![0])
    }
  }

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name: string = e.target.name
    const value: string = e.target.value

    setForm({ ...form, [name]: value })
  }

  const formHandler = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    const formValues = Object.values(form).slice(2)

    for (let i = 0; i < formValues.length; i++) {
      if (formValues[i].trim() === "") {
        alert("Please fill blank fields")
        break
      }
    }

    if (validateEmail(form.email) === false) {
      alert("Please Input Email")
    } else if (form.password !== form.repeatpass) {
      alert("Repeated password doesn't match what you inputed")
    } else if (form.password.length < 8) {
      alert("Your password mustn't be less than 8 charcters")
    } else {
      const fileData: any = new FormData()
      fileData.append("file", fileHandler)

      await axios
        .post("http://localhost:5000/signup", form)
        .then((res) => {
          if (res.status === 200 && res.data.msg === "email exists") {
            alert(`${form.email} already exists`)
          } else {
            localStorage.setItem("authToken", JSON.stringify(res.data.token))
            sessionStorage.setItem("qw", JSON.stringify(res.data.token_validate))
            navigate("/dashboard")
          }
        })
        .catch((err) => console.log(err))

      await axios
        .post(
          `http://localhost:5000/upload/avatar/${form.path.split("-")[0]}`,
          fileData
        )
        .then((result) => console.log("success"))
        .catch((err) => console.log(`Some error detected`, err))
    }
  }

  const signStyles = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className={signStyles.circle}>
            <input
              type="file"
              accept="image/*"
              className="signup_file"
              onChange={fileUploadHandler}
            />
            {form.image === "" ? (
              <FontAwesomeIcon icon={faCamera} color="#5136C2" size={"4x"} />
            ) : (
              <img src={form.image} alt="hipika-avatar" className="avatar-in-sign" />
            )}
          </div>
          <Box component="form" noValidate onSubmit={formHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="off"
                  name="name"
                  required
                  onChange={inputHandler}
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={form.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  onChange={inputHandler}
                  name="surname"
                  autoComplete="off"
                  value={form.surname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={inputHandler}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="off"
                  value={form.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  onChange={inputHandler}
                  id="password"
                  autoComplete="off"
                  value={form.password}
                />
                <Grid item xs={12}>
                  <TextField
                    style={{
                      marginTop: "10px",
                    }}
                    required
                    fullWidth
                    name="repeatpass"
                    label="Reapeat password"
                    type="password"
                    id="password"
                    autoComplete="off"
                    value={form.repeatpass}
                    onChange={inputHandler}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                background: "#5136C2",
              }}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/log-in" style={{ color: "#5136C2" }}>
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}

export default SignUp
