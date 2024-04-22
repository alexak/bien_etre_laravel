import Rating from "@/Components/1_atom/Rating";
import ReviewDetails from "@/Components/2_molecule/reviews/ReviewDetails";
import { Button, Card, CardBody } from "@material-tailwind/react";
import { useState } from "react";
import { router } from '@inertiajs/react';


export default function NewReviewForm({
    commerce,
    parentSetDisplay 
}) {


    const [formData, setFormData] = useState({});

    const handleInput = (event) => {
        handleResize(event);
        setFormData({ ...formData, ['comment']: event.target.value })
    }

    const handleResize = (event) => {
        const textarea = event.target;
        // Reset height to 'auto' to reduce the height if the text is deleted
        textarea.style.height = 'auto';
        // Set the height to scrollHeight to expand as the text increases
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const saveReview = async () => {
        const reviewUrl = "/commerce/"+commerce.slug+"/review";
        const response = await router.post(reviewUrl, {
            data: formData,
            preserveScroll: true,
            onError: errors => {console.error("An error occurred:", errors);},
        });
    }

    return (
        <div className="flex flex-col w-ful">
            {/** Title */}
            <div className="pb-4 text-xl font-semibold">
                <h2>Ajouter un nouveau avis</h2>
            </div>

            {/** Information */}
            <div className="flex flex-row pb-6">
                <img
                    className="h-[30px] w-[30px] mr-4 mt-2"
                    src="/images/icons/info.png"
                    alt="" 
                    width="30" 
                    height="30"
                />
                <div>
                    N’hésitez pas à partager votre avis sur ce commerce ; vos retours sont précieux pour aider le commerçant à s’améliorer. Nous vous invitons à rester courtois et objectif dans vos commentaires pour garantir une critique constructive.
                </div>
            </div>

            {/** Formbody */}
            <Card className="w-full mb-6">
                <CardBody>
                    <div className="flex flex-row w-full pb-6">
                        {/** Textarea */}
                        <div className="flex flex-col w-2/3 mr-6">
                            <textarea
                                className="w-full h-auto min-h-full overflow-hidden border-gray-300 rounded-lg resize-none focus:border-gray-400 focus:ring-0"
                                onInput={(event)=>handleInput(event)}
                            />
                        </div>
                        {/** Ratingdetails */}
                        <div className="flex flex-col w-1/3 h-full">
                            <ReviewDetails 
                                readonly={false}
                                setData={(value)=>setFormData(value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row items-center">
                            <span className="pr-2">
                                Votre note:
                            </span>
                            <Rating
                                name="rating" 
                                setData={(value) => setFormData(value)}
                            />
                        </div>

                        <div className="flex flex-row">
                            <Button
                                onClick={()=>{parentSetDisplay('summary')}} 
                                className="mr-4 w-[200px] h-[40px] hover:shadow-none text-pink-500 bg-gray-50 hover:bg-gray-100 cursor-pointer border-pink-500 border-2 rounded-lg flex justify-center items-center uppercase">
                                Annuler
                            </Button>
                            <Button
                                onClick={()=>saveReview()} 
                                className="w-[200px] h-[40px] hover:shadow-none text-white cursor-pointer bg-pink-500 rounded-lg flex justify-center items-center uppercase">
                                Donner son avis
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

