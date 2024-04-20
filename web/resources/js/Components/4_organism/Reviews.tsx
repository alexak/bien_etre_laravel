
import { useState } from "react"

import { Button } from "@material-tailwind/react"
import NewReviewForm from "@/Components/3_cell/reviews/NewReviewForm"
import ReviewSummary from "@/Components/3_cell/reviews/ReviewSummary"

export default function Reviews({ratings}) {

    const [display, setDisplay] = useState('summary')

    return (
        <div className="flex flex-col">

            <div className="flex flex-row items-center justify-between w-full py-4 mb-6 border-b-2">
                <div className="text-2xl uppercase">
                    <h2>L'avis des clients</h2>
                </div>
                <Button
                    onClick={()=>{setDisplay('new')}} 
                    className="w-[200px] h-[40px] text-white cursor-pointer bg-pink-500 rounded-lg flex justify-center items-center uppercase">
                    Donner son avis
                </Button>
            </div>

            { display == 'new' ? (
                <NewReviewForm parentSetDisplay={()=>setDisplay()} />
            ):(
                <ReviewSummary ratings={ratings} />
            )
            }

        </div>
    )
}

/*

        <>
        
        <div className="w-full my-4 text-2xl uppercase border-b-2">
                        <h2>L'avis des clients</h2>
                    </div>
                    <div>

                    2. Dynamic Rating System
Create a rating system that adapts the questions or prompts based on the star rating given. For instance:

If a user gives a 1 or 2-star rating, prompt them to provide feedback on what disappointed them and suggestions for improvement.
If a user gives a 5-star rating, the prompt could encourage them to highlight what particularly impressed them.

                    </div>
        
        
        </>
        */