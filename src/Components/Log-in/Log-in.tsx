import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import { Link, useNavigate } from "react-router-dom"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import { styled } from "@mui/material/styles"
import Container from "@mui/material/Container"
import { ThemeProvider, createMuiTheme } from "@mui/material/styles"
import "../../less/Signup-styles/style.css"
import { Checkbox } from "@mui/material"
import axios from "axios"

const themeDark = createMuiTheme({
  palette: {
    background: {
      default: "#222222",
    },
    text: {
      primary: "#ffffff",
    },
  },
})

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#5136C2",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#5136C2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#5136C2",
    },
    "&:hover fieldset": {
      borderColor: "#5136C2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#5136C2",
    },
    "&::-webkit-input-placeholder": {
      color: "#5136C2",
    },
    "&::placeholder": {
      color: "#5136C2",
    }
  },
})

const SignUp = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  })
  let navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [exist, setExist] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name: string = e.target.name
    const value: string = e.target.value

    setLogin({ ...login, [name]: value })
  }

  useEffect(() => {
    setExist(false)
    setCorrect(false)
  }, [login])

  const formHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await axios
      .post("http://localhost:5000/login", login)
      .then((response) => {
        console.log(response.data)

        setIsLoading(false)
        if (response.data.msg === "user not found") {
          setCorrect(false)
          setExist(true)
        }
        if (response.data.msg === "password is incorrect") {
          setCorrect(true)
          setExist(false)
        } else if (response.data.token && response.data.tokenValidator) {
          localStorage.setItem("authToken", JSON.stringify(response.data.token))
          sessionStorage.setItem("qw", JSON.stringify(response.data.tokenValidator))
          navigate("/dashboard")
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <ThemeProvider theme={themeDark}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={formHandler}
        >
          <Box
            component="form"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            {exist ? (
              <div
                style={{
                  background: "#ff3a3a",
                  borderRadius: "5px",
                  height: "50px",
                  margin: "20px 0",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >{`${login.email} doesn't exist`}</div>
            ) : correct ? (
              <div
                style={{
                  background: "#ff3a3a",
                  borderRadius: "5px",
                  height: "50px",
                  margin: "20px 0",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Password is incorrect
              </div>
            ) : null
            }

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CssTextField
                  label="Email"
                  id="custom-css-outlined-input"
                  style={{ width: "100%" }}
                  name="email"
                  onChange={inputHandler}
                  value={login.email}
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <CssTextField
                    label="Password"
                    id="custom-css-outlined-input"
                    style={{ width: "100%" }}
                    type={showPassword ? "text" : "password"}
                    value={login.password}
                    name="password"
                    autoComplete="off"
                    onChange={inputHandler}
                  />
                </Grid>
              </Grid>
              <Checkbox
                style={{ transform: "translateX(5px)" }}
                color="secondary"
                onClick={() => setShowPassword((c) => !c)}
              />
              <p style={{ transform: "translateY(8px)" }}>Show Password</p>
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
              {isLoading ? <span className="loader"></span> : "Log in"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/sign-up" style={{ color: "#5136C2" }}>
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default SignUp
