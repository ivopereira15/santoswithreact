import './product.css'; 
import {useNavigate, useParams  } from 'react-router-dom';
import React, { useState, useEffect, useContext  } from 'react';
import { useSelector } from 'react-redux';
import ApiService from './core/service/service';
import { Context } from "./core/context/store";
import { Tab } from '@headlessui/react'

export default function ProductDetailPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [state, dispatch] = useContext(Context);

    const testApi = async () => {
        // Test Get DATA
        try {
          setLoading(true);
          console.log(slug)
          const usersData = await ApiService.httpGetProduct(`/products/${slug}`);
          setUsers(usersData);
          setLoading(false);
        } catch (err) {
          console.error(err.message);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        testApi();
      }, []);
    
      if (loading) {
        return <h1>Loading...</h1>;
      }

      const addToCart = async () => {
       
        const x = state.producs.find(x => x.id === users.id);
        console.log(x)
        if(x === undefined){
       
        console.log(1112323)
        users.quantity = Number(1);
        const newProduct =  users;
        console.log(newProduct)
        dispatch({type: 'ADD_TO_CART', payload: newProduct });

       
        } else {
            console.log(2323)
            const x = state.producs.find(x => x.id === users.id);
           
            x.quantity = Number(x.quantity) + Number(1); 
            dispatch({type: 'EDIT_CART', payload: x });
        }
  
      }

   


    return (
        <>
                       <button
                  onClick={() => navigate(-1)}
                   
                    className="goback flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                     Go back
                  </button>
     
<main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
<div className="mx-auto max-w-2xl lg:max-w-none">
  {/* Product */}
  <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
    {/* Image gallery */}
    <Tab.Group as="div" className="flex flex-col-reverse">

      <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
     
          <Tab.Panel >
            <img
             src={users.image} alt={users.name} 
              className="h-full w-full object-cover object-center sm:rounded-lg mt-0"
            />
          </Tab.Panel>
       
      </Tab.Panels>
    </Tab.Group>
                {/* Product info */}
                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{users.name}</h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">Price: {users.price} €</p> 
              </div>
              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{ __html: users.description }}
                />
              </div>
              <div className="mt-10 flex">
                  <button
                  onClick={addToCart}
                    type="submit"
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Add to Cart
                  </button>
                </div>

</div>
</div>
</div>
</main>
       
       
        </>
        
      );
}


