import Rating from "@/Components/1_atom/Rating";
import ReviewDetails from "@/Components/2_molecule/reviews/ReviewDetails";
import { Button, Card, CardBody } from "@material-tailwind/react";
import { useState } from "react";
import { router, usePage } from '@inertiajs/react';


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
                console.log("Review added successfully");
                setDisplay('confirmation');
                // You can handle a successful submission here without needing JSON
            }
        });
    }

    const messages = {
        negative: {
            titles: [
                "Merci d'avoir partagé votre expérience.",
                "Nous prenons votre avis très au sérieux.",
                "Nous informerons le commerçant de votre avis.",
                "Nous vous remercions de votre contribution à l'amélioration de nos services."
            ],
            responses: [
                "Merci d'avoir pris le temps de partager votre expérience avec nous. Nous sommes désolés que votre visite ne se soit pas déroulée comme vous l'espériez. Votre avis est précieux pour nous et nous aidera à améliorer nos services.",
                "Nous comprenons votre frustration et prenons vos commentaires très au sérieux. Nous allons mener une enquête approfondie sur votre expérience et prendre les mesures nécessaires pour remédier à la situation.",
                "Nous allons informer le commerçant de votre avis afin qu'il puisse en prendre connaissance et prendre les mesures appropriées. Nous espérons qu'il réagira de manière constructive à votre feedback et qu'il mettra tout en œuvre pour améliorer l'expérience de ses clients.",
                "Merci de votre contribution à l'amélioration de nos services. Vos commentaires nous permettent de mieux comprendre les besoins de nos clients et de leur offrir une meilleure expérience.",
            ]
        },
        positive: {
            titles: [
                "Merci pour votre avis positif !",
                "Nous sommes heureux que vous ayez passé un bon moment.",
                "Votre avis nous encourage à continuer dans cette direction.",
                "Nous vous invitons à revenir nous voir bientôt.",
                "Parlez de nous à votre entourage !"
            ],
            responses: [
                "Merci d'avoir pris le temps de partager votre expérience avec nous. Nous sommes ravis que vous ayez apprécié votre visite chez notre partenaire!",
                "Votre satisfaction est notre priorité absolue. Nous sommes heureux que vous ayez apprécié nos produits, nos services et notre ambiance.",
                "Vos commentaires positifs nous motivent à continuer à offrir à nos clients la meilleure expérience possible.",
                "Nous serions ravis de vous accueillir à nouveau dans notre boutique/restaurant/établissement. N'hésitez pas à nous rendre visite avec vos amis et votre famille.",
                "Recommanderiez-vous notre boutique/restaurant/établissement à vos amis et à votre famille ? Nous vous serions reconnaissants de partager votre expérience positive avec votre entourage."            
            ]
        }
    };

    const getRandomTitle = () => {
        const titles = messages[formData.rating < 4 ? "negative" : "positive"].titles;
        return titles[Math.floor(Math.random() * titles.length)];
    };

    const getRandomResponse = () => {
        const titles = messages[formData.rating < 4 ? "negative" : "positive"].responses;
        return titles[Math.floor(Math.random() * titles.length)];
    };


    return (
        <div className="flex flex-col w-ful">
            {/** Formbody */}
            <Card className="w-full mb-6 border">
                {display == 'form' ? 
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
                : 
                    <></>
                }
                {display == 'confirmation' ?
                    <CardBody className="flex flex-col">
                        <div className="pb-4 text-xl font-semibold">
                            <h2>{getRandomTitle()}</h2>
                        </div>
                        <div className="pb-6">
                            {getRandomResponse()}
                        </div>
                        <Button
                            onClick={()=>{parentSetDisplay('summary')}} 
                            className="w-full md:w-[200px] h-[40px] hover:shadow-none text-white cursor-pointer bg-pink-500 rounded-lg flex justify-center items-center uppercase">
                                Fermer
                        </Button>
                    </CardBody>
                :
                    <></>
                }
            </Card>
        </div>
    );
}

