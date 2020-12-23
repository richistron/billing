const isEmailValid = (email: string): boolean => Boolean(email.match(/\S+@\S+\.\S+/))

export default isEmailValid
