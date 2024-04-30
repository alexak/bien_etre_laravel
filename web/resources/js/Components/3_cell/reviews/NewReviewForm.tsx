import Rating from "@/Components/1_atom/Rating";
import ReviewDetails from "@/Components/2_molecule/reviews/ReviewDetails";
import { Button, Card, CardBody } from "@material-tailwind/react";
import { useState } from "react";
import { router, usePage } from '@inertiajs/react';
import NewReviewMessage from "@/Components/2_molecule/reviews/NewReviewMessage";


export default function NewReviewForm({
    commerce,
    parentSetDisplay 
}) {
    const { props } = usePage();

    const [formData, setFormData] = useState({
        comment:'',
        rating:5,
        priceRating:5,
        professionalismRating:5,
        cleanlinessRating:5,
        kindnessRating:5,
        qualityRating:5,
        commerceId:commerce.id
    });
    const [display, setDisplay] = useState('form')

    const handleInput = (event) => {
        handleResize(event);
        setFormData({ ...formData, ['comment']: event.target.value })
    }

    const handleRatingChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleResize = (event) => {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const saveReview = async () => {
        const reviewUrl = "/commerce/"+commerce.slug+"/review";
        const response = await router.visit(reviewUrl, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
            },
            data: formData,
            preserveScroll: true,
            preserveState: true,
            onError: errors => {console.error("An error occurred:", errors);},
            onSuccess: (page) => {
                setDisplay('confirmation');
            }
        });
    }

    return (
        <div className="flex flex-col w-ful">
            {/** Formbody */}
            {display == 'form' ? 
                <Card className="w-full mb-6 border">
                    <CardBody>

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

                        <div className="flex flex-col w-full pb-6 lg:flex-row">
                            {/** Textarea */}
                            <div className="flex flex-col w-full mb-6 lg:mb-0 lg:mr-6 lg:w-1/2 xl:w-2/3">
                                <textarea
                                    className="w-full h-auto min-h-full overflow-hidden border-gray-300 rounded-lg resize-none focus:border-gray-400 focus:ring-0"
                                    onInput={(event)=>handleInput(event)}
                                />
                            </div>
                            {/** Ratingdetails */}
                            <div className="flex flex-col w-full h-full lg:w-1/2 xl:w-1/3">
                                <ReviewDetails 
                                    readonly={false}
                                    handleRatingChange={(name, value) => handleRatingChange(name, value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col justify-between md:flex-row">
                            <div className="flex flex-row items-center pb-4 md:pb-0">
                                <span className="pr-2">
                                    Votre note:
                                </span>
                                <Rating setData={(name, value) => handleRatingChange('rating', value)} />
                            </div>

                            <div className="flex flex-col md:flex-row">
                                <Button
                                    onClick={()=>{parentSetDisplay('summary')}} 
                                    className="mb-4 md:mb-0 mr-4 w-full md:w-[200px] h-[40px] hover:shadow-none text-pink-500 bg-gray-50 hover:bg-gray-100 cursor-pointer border-pink-500 border-2 rounded-lg flex justify-center items-center uppercase">
                                    Annuler
                                </Button>
                                <Button
                                    onClick={()=>saveReview()} 
                                    className="w-full md:w-[200px] h-[40px] hover:shadow-none text-white cursor-pointer bg-pink-500 rounded-lg flex justify-center items-center uppercase">
                                    Donner son avis
                                </Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            : 
                <></>
            }
            {display == 'confirmation' ?
                <NewReviewMessage
                    rating={formData.rating}
                    parentSetDisplay={()=>{parentSetDisplay('summary')}} 
                />
            :
                <></>
            }
        </div>
    );
}

