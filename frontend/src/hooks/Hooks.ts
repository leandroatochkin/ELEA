import { useState, useEffect } from "react"

export function useMobile() {
    const [isMobile, setIsMobile] = useState(false)
  
    useEffect(() => {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }
  
      // Check on initial load
      checkIfMobile()
  
      // Add event listener for window resize
      window.addEventListener("resize", checkIfMobile)
  
      // Clean up event listener
      return () => window.removeEventListener("resize", checkIfMobile)
    }, [])
  
    return isMobile
  }

export function useGetData(url: string){
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    console.log(url)
    useEffect(()=>{
            const getData = async () => {
                setLoading(true)
                try{
                const response = await fetch(url, {
                    method: 'GET'
                })
                if(!response.ok){
                    setError('Error fetching data.')
                    setLoading(false)
                } else {
                    const data = await response.json()
                    console.log(data.results)
                    setData(data)
                    setLoading(false)
                }

            } catch (e){
                console.error(e)
                setError(String(e))
            }
            }

            getData()
    },[url])

    return {data, loading, error}
}