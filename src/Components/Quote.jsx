import React, { useEffect, useState } from 'react';

const Quote = () => {
     const [quote  , setquote] = useState(" ")
     const [author  , setauthor] = useState(" ")
  //  const [previous , setprevious] = useState("")

    const newQuote = async ()=>{
               try {
                  const request = await fetch(
                    'https://api.api-ninjas.com/v1/quotes?category=learning',
                    {
                      headers:{'X-Api-Key':'r4Zp/6Jejb9SfZ9rRPBzOA==Ocy3OtMhNqDQruE3'}
                    }
                   );
                   if(!request.ok){
                       console.log ('error in request')
                   }
                   else{
                    const data = await request.json()
                    setquote(data[0].quote)
                    setauthor(data[0].author)
                       }
               }       
               catch (error)
               {
                console.error("some error", error);    
               }  

    }

    const shareQuote = () => {
      const textToShare = `"${quote}" - ${author}`;
  
      if (navigator.share) {
        navigator.share({
          title: 'Inspirational Quote',
          text: textToShare,
        }).catch((error) => console.log('Error sharing', error));
      } else {
        // Fallback: Copy to clipboard if Web Share API is not supported
        navigator.clipboard.writeText(textToShare)
          .then(() => alert('Quote copied to clipboard!'))
          .catch((error) => console.error('Error copying to clipboard', error));
      }}

    useEffect(()=>{
      newQuote();
    },[] )

    return (
        <>
         <div className=" mt-11  w-[90%] md:w-[60%] mx-auto">
            <div className='bg-[#E2B2DF] font-quote text-3xl text-purple-700 w-[100%] h-full rounded-md '> {quote} </div>
            <div className='bg-[#E2B2DF] font-lobster text-purple-600 w-56 h-full mt-3 rounded-md ms-auto'> {author} </div>

            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 justify-center mt-4 ">
              <button onClick={newQuote}  className='bg-purple-500 text-white text-md rounded-2xl mx-2  px-3 py-2 '>New Quote</button>
              <button  onClick={shareQuote}  className='00 bg-purple-500 text-white text-md rounded-2xl  mx-2 px-3 py-2'>Share Quote </button>
              <button   className='bg-purple-500 text-white text-md rounded-2xl  mx-2 px-3 py-2'>Previous Quote</button>
            </div>
            <h1 className="font-lobster text-4xl text-purple-800 mt-10"> Quote Generator App</h1>
            <h1 className='text-4xl  text-purple-600 font-quote ms-4'>Transform your mindset one quote at a time—discover and share the wisdom!</h1>
        </div>
      
        </>
      

    );
};

export default Quote;