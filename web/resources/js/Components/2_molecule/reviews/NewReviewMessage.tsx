
import { Button, Card, CardBody } from "@material-tailwind/react";


export default function NewReviewMessage({
    rating,
    parentSetDisplay
}) {

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
        const titles = messages[rating < 4 ? "negative" : "positive"].titles;
        return titles[Math.floor(Math.random() * titles.length)];
    };

    const getRandomResponse = () => {
        const titles = messages[rating < 4 ? "negative" : "positive"].responses;
        return titles[Math.floor(Math.random() * titles.length)];
    };



    return (
        <Card className="w-full mb-6 border">
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
        </Card>
    )
}