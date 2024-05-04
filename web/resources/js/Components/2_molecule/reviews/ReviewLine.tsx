
import { Button, Card, CardBody } from "@material-tailwind/react";
import Rating from "@/Components/1_atom/Rating";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';

export default function ReviewLine({review}){

    const getTimePeriod = (timestamp) => {
        return DateTime.fromISO(timestamp).toRelative({ locale: "fr" });
    }

    return (
        <Card className="mb-6 border">
            <CardBody className="flex flex-col">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row items-center h-[40px]">
                        <Rating 
                            readonly
                            showNumbers={false}
                            value={review.rating}
                        />
                        {/*
                        <Button className="p-2 ml-10 text-pink-500 bg-white rounded-full">
                            <FontAwesomeIcon 
                                className="w-4 h-4 " 
                                icon={faThumbsUp}
                            />
                        </Button>
                        */}
                    </div>
                    <div>
                        publié par <span className="font-bold capitalize">{review.user.name}</span> {getTimePeriod(review.created_at)}
                    </div>
                </div>
                <div>{review.comment}</div>
            </CardBody>
        </Card>
    )
}