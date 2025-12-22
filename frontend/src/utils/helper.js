import toast from "react-hot-toast"

export const validateLoginForm = (email, password) => {
    if (!email.trim()) return toast.error("Email is required")
    if (!password.trim()) return toast.error("Password is required")
    return true
}

export const validateRegisterForm = (name, username, email, password) => {
    if (!name.trim()) return toast.error("Name is required")
    if (!username.trim()) return toast.error("username is required")
    if (!/^[a-z0-9._]+$/.test(username))
        return toast.error("Invalid username format");
    if (!email.trim()) return toast.error("Email is required")
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
        return toast.error("Invalid email format");
    if (!password.trim()) return toast.error("Password is required")
    return true
}