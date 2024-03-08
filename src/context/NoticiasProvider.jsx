import axios from 'axios'
import {useState, useEffect, createContext} from 'react'

 const NoticiasContext = createContext()

 const NoticiasProvider = ({children}) => {
    const [categoria, setCategoria] = useState('general')
    const [noticias, setNoticias] = useState([])
    const [pagina, setPagina] = useState(1)
    const [totalNoticias, setTotalNoticias] = useState(0)
    useEffect(() => {
        const consultarAPI = async () => {
            const url = `https://newsapi.org/v2/top-headlines?country=us&category=${categoria}&apiKey=f2c9faba2cf9409396fc9fc378ef25f7`
            
            const { data } = await axios(url)
            setNoticias(data.articles)
            setTotalNoticias(data.totalResults)
            setPagina(1)
        }
        consultarAPI()
    }, [categoria])
    useEffect(() => {
        const consultarAPI = async () => {
            const url = `https://newsapi.org/v2/top-headlines?country=us&category=${categoria}&page=${pagina}&apiKey=f2c9faba2cf9409396fc9fc378ef25f7`
            
            const { data } = await axios(url)
            setNoticias(data.articles)
            setTotalNoticias(data.totalResults)
        }
        consultarAPI()
    }, [pagina])

    const handleChangeCategoria = e => {
        setCategoria(e.target.value)
    }

    const handleChangePagina = (e, valor) => {
            setPagina(valor)
    }

    return(
        <NoticiasContext.Provider
            value={{
                categoria,
                handleChangeCategoria,
                noticias,
                totalNoticias,
                handleChangePagina,
                pagina
            }}
        >
            {children}
        </NoticiasContext.Provider>        
    )
 }

 export {
    NoticiasProvider
 }
 export default NoticiasContext