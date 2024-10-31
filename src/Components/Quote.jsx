import React, { useState } from 'react';

const Quote = () => {
     const [quote  , setquote] = useState(" ")

    const  fetchquote = async ()=> {
      try {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=learning',{
            headers: { 'X-Api-Key': 'r4Zp/6Jejb9SfZ9rRPBzOA==Ocy3OtMhNqDQruE3' }
        });

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        if(data && data.length > 0){
         setquote(data[0].quote)
        }else{
            console.error("Unexpected data format:", data);
        }

      } catch (error) {
        console.error("Error fetching quote:", error);
      }

    };

    return (
        <>
         <div className=" mt-11 ">
            <div className='bg-[#E2B2DF]  w-[50%] h-full  mx-auto'>
              {quote}    
            </div>
        <div className='bg-pink-300 w-28 h-full'>

              ghdkgd  
        </div></div>
       <div className="">
       <button onClick={fetchquote}  className='bg-green-500'>New Quote</button>
        <button onClick={fetchquote}  className='bg-green-500'>Share Quote </button>
        <button onClick={fetchquote}  className='bg-green-500'>Previous Quote</button>
       </div>
        </>
      

    );
};

export default Quote;