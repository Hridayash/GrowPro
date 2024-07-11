export default function TrainingMaterial (){
    return (
        <>
            {/* section for title and add button */}
        <div className="flex justify-between gap-6">
            <h1>
            Training Material
            </h1>
            <button className="bg-blue-500 text-white p-2 px-4 rounded-xl">
                    + Add
            </button>
        </div>

         {/* List of the training materials */}
         <div className="">
         <div className="border rounded-xl p-4 my-4">
            <h1 className="font-bold">React Fundamentals</h1>
            <p className='text-gray-500'>Learn the fundamentals of React, a popular JavaScript library for building user interfaces.</p>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/Rh3tobg7hEo?si=Npg9bVqD9pTqqOdx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
         <div className="flex gap-2 items-center">
                    <p>Duration : 30mins</p>
                    <button className="bg-blue-500 text-white p-1 px-2 rounded-xl">
                        Start
                    </button>

         </div>
            
            
         </div>
         <div className="border rounded-xl p-4">
            <h1 className="font-bold">React Fundamentals</h1>
            <p className='text-gray-500'>Learn the fundamentals of React, a popular JavaScript library for building user interfaces.</p>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/Rh3tobg7hEo?si=Npg9bVqD9pTqqOdx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
         <div className="flex gap-2 items-center">
                    <p>Duration : 30mins</p>
                    <button className="bg-blue-500 text-white p-1 px-2 rounded-xl">
                        Start
                    </button>

         </div>
            
            
         </div>
         <div className="border rounded-xl p-4">
            <h1 className="font-bold">React Fundamentals</h1>
            <p className='text-gray-500'>Learn the fundamentals of React, a popular JavaScript library for building user interfaces.</p>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/Rh3tobg7hEo?si=Npg9bVqD9pTqqOdx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
         <div className="flex gap-2 items-center">
                    <p>Duration : 30mins</p>
                    <button className="bg-blue-500 text-white p-1 px-2 rounded-xl">
                        Start
                    </button>

         </div>
            
            
         </div>
         </div>

            
        
        </>
        
    );
}