const { createContext, useState } = require("react");

export const GlobalContext = createContext();


export const GlobalContextProvider = ({children}) => {
    const [isloading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    return (
        <GlobalContext.Provider 
        value={
           {
            isloading, setIsLoading,
            isError, setIsError,
            isSuccess, setIsSuccess
           }
        }
          
            >
            {children}
        </GlobalContext.Provider>
    )
}