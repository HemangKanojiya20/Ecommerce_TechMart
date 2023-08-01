
import { toast } from 'react-toastify';
import {BASE_URL} from './config'
export const addToCart = async(id) => {
    try {
        
        const token = localStorage.getItem("token")
        const res = await fetch(`${BASE_URL}/cart/add`, {
          method:'post',
          headers:{
            "content-type": "application/json",
            Authorization:`Bearer ${JSON.stringify(token)}`
          },
          credentials:"include",
          body:JSON.stringify({productId: id})
        })
  
        const result = await res.json();
        if(!res.ok){
          return toast.warn(result.message)
        }
      toast.success(result.message)
      window.location.reload(false);
      } catch (error) {
        toast.error(error.message)
        return;
      }
}

export const decreaseQty = async(id) => {
  try {
      
      const token = localStorage.getItem("token")
      const res = await fetch(`${BASE_URL}/cart/decrease`, {
        method:'post',
        headers:{
          "content-type": "application/json",
          Authorization:`Bearer ${JSON.stringify(token)}`
        },
        credentials:"include",
        body:JSON.stringify({productId: id})
      })

      const result = await res.json();
      if(!res.ok){
        return toast.warning(result.message)
      }
    toast.success(result.message)
    window.location.reload(false);
    } catch (error) {
      toast.error(error.message)
      return;
    }
}

export const removeFromCart = async(id) => {
  try {
      
      const token = localStorage.getItem("token")
      const res = await fetch(`${BASE_URL}/cart/remove`, {
        method:'delete',
        headers:{
          "content-type": "application/json",
          Authorization:`Bearer ${JSON.stringify(token)}`
        },
        credentials:"include",
        body:JSON.stringify({productId: id})
      })

      const result = await res.json();
      
      if(!res.ok){
        return toast.warning(result.message)
      }
    toast.success(result.message)
    window.location.reload(false);
    } catch (error) {
      
      toast.error(error.message)
      return;
    }
}