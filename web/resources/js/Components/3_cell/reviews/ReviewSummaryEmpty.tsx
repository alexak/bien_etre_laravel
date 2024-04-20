

import { Button, Card, CardBody } from "@material-tailwind/react"


export default function ReviewSummaryEmpty({ parentSetDisplay }){

    return(
        <Card className="w-full mb-6 border border-gray-200">
            <CardBody>
                <div className="flex flex-row w-full pb-6">
                    <img
                        className="h-[30px] w-[30px] mr-4 mt-2"
                        src="/images/icons/info.png"
                        alt="" 
                        width="30" 
                        height="30"
                    />
                    <div>
                        Actuellement, il n'y a pas encore d'avis pour ce commerce. Soyez la première à en laisser un !
                        N’hésitez pas à partager votre avis sur ce commerce ; vos retours sont précieux pour aider le commerçant à s’améliorer. Nous vous invitons à rester courtois et objectif dans vos commentaires pour garantir une critique constructive.
                    </div>
                </div>
                <div className="flex flex-row justify-center">
                    <Button
                        onClick={()=>{parentSetDisplay('new')}} 
                        className="w-[300px] h-[40px] text-white cursor-pointer bg-pink-500 rounded-lg flex justify-center items-center uppercase">
                        Soyez la première à donner son avis
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}