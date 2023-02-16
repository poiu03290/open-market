import { useState, useMemo } from 'react';

const ValidationForm = ({ 
    value,
    error,
    validation,
    ...props
 }) => {

    const [errorMessage, setErrorMessage] = useState('')

    const isEmptyValueCheck = (e) => {
        if(e.target.value === '') {
            setErrorMessage('필수 정보입니다.')
        } else {
            setErrorMessage('')
        }
    }

    const isValid = useMemo(() => {
        if (error && error.message !== '') {
            setErrorMessage(error.message)
            return error.result
        }

        else if (validation) {
            setErrorMessage(validation)
            return false
        }

    }, [error, errorMessage, validation])

    return (
        <>   
            <input 
                value={value}
                {...props}
                onBlur={isEmptyValueCheck}
            />
            {errorMessage && <span className={isValid ? 'proper' : 'error'}>{errorMessage}</span>}
        </>
    )
}

export default ValidationForm;