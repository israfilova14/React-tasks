import React,{useState , useEffect} from 'react'
import axios from "axios"
import "./Task.css"

const Task = () => {

 const [products, setProducts] = useState([])
 const [image, setImage] = useState("")
 const [title, setTitle] = useState("")
 const [price, setPrice] = useState("")
 const [category, setCategory] = useState("")
 
 const getProducts = async()=>{
    const response = await axios.get("http://localhost:3000/products")
    setProducts(response.data)
 }

 const deleteProduct = (id)=>{
   try{
      
     axios.delete( `http://localhost:3000/products/${id}`)
     .then(response=>{
       console.log(response);
       if(response.status ===200){
         setProducts(products.filter(element=>element.id !==id));
       }
   })
   }catch(error){
     console.log(error);
   }
 
 }
 
 const postData = async(e)=>{

   e.preventDefault()
 
   axios.post("http://localhost:3000/products",{ image: image,
   title: title,
   price: price,
   category: category,})
   .then(res=>{
     console.log(res);
   })
   
 }
 useEffect(()=>{
    getProducts()
 },[])

 useEffect(()=>{
  postData()
 },[])


  return (
     <>
        <div className='homePage'>
        <h1>Products </h1>
        <div className='formBox' >
                <form action="" onSubmit={postData}>
                    <input type="text" placeholder='Please enter product image URL' onChange={e=>setImage(e.target.value)}/>
                    <br /> 
                    <input type="text" placeholder='Please enter product tile' onChange={e=>setTitle(e.target.value)}/>
                    <br />
                    <input type="text" placeholder='Please enter product price' onChange={e=>setPrice(e.target.value)}/>
                    <br />
                    <input type="text" placeholder='Please enter product category'onChange={e=>setCategory(e.target.value)}/>
                    <br />
                </form>
                <button className='addButton'>Add</button>
              </div>
            <br />
     <div className='card'>
        {
            products?.map(element=>{
                return <div key={element.id} className='productCard'>
                    
                    <img src={element.image} alt="" className='productImage' />
                     <div className='cardBody'>
                        <p className='elementTitle'>{element.title}</p>
                        <p className='elementPrice'>{element.price}</p>
                        <p className='elementCategory'>{element.category}</p>
                        <button className='deleteButton'onClick={()=>{deleteProduct(element.id)}}>Delete</button>
                     </div>
                   
                </div>
            })
        }
     </div>
        </div>
     </>
  )
}

export default Task