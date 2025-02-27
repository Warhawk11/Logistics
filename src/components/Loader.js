import React from 'react'

const Loader = ({isLoading, type, category, text}) => {
  console.log(isLoading);
  
  return (
    <> 
        {isLoading && (
            <div className='absolute left-[50%] top-[50%] '>
                <div class=" w-20 h-12">
                    <span class={`w-[150px] absolute top-0 m-0 p-0 ${type === 'companyDetails' ? 'text-black' : 'text-white'} text-[0.8rem] tracking-[1px] `}>

                      {text}
                    </span>
                    <span class="absolute bottom-0 h-4 bg-indigo-700 rounded-full translate-x-[64px] animate-loading_713">
                        <span class="absolute w-full h-full bg-indigo-300 rounded-full animate-loading2_713"></span>
                    </span>
                </div>
            </div>
                  
    )} 
    </>
  )
}

export default Loader