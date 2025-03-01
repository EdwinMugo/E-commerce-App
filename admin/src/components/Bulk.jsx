import React, {useState} from 'react'

const Bulk = () => {
    const [file, setFile] = useState(null);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        size: [],
        image: [],
        category: '',
        subcategory: ''
    });

    const handleFileUpload = async() =>{
        try{
        if(file){

        }
        } catch(err){

        }

    }

  return (
    <div>
      
    </div>
  )
}

export default Bulk
