
import { Card, CardBody } from "@material-tailwind/react";
import Rating from "@/Components/1_atom/Rating";
import { DateTime } from "luxon";

export default function ReviewLine({review}){

    console.log(review);

    const getTimePeriod = (timestamp) => {
        return DateTime.fromISO(timestamp).toRelative({ locale: "fr" });
    }

    return (
        <Card className="mb-6 border">
            <CardBody className="flex flex-col">
                <div className="flex flex-row justify-between">
                    <Rating 
                        readonly
                        showNumbers={false}
                        value={review.rating}
                    />
                    <div>
                        publié par <span className="font-bold capitalize">{review.user.name}</span> {getTimePeriod(review.created_at)}
                    </div>
                </div>
                <div>{review.comment}</div>
            </CardBody>
        </Card>
    )
}