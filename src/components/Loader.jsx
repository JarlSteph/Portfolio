
import { Html } from '@react-three/drei' // so we can use html properties in our maiscreen canvas 


const Loader = () => {
  return (
    <Html>
    <div className="flex justify-center items-center "> 
        <div className="w-20 h-20 border-2 border-opacity-20 border-blue-500 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
    </Html>
  )
}

export default Loader