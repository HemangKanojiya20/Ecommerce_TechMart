import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useFetch = (url) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      
        const fetchData = async() => {
            setLoading(true);

            try {
                const res = await fetch(url)
    
                if(!res.ok){
                    setError("Failed to fetch")
                    toast.error("Failed to fetch");
                }

                const result = await res.json();
                setData(result.data)
                setLoading(false)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }

        fetchData();
    }, [url])
    return {
        data, loading, error
    };
}

export default useFetch;