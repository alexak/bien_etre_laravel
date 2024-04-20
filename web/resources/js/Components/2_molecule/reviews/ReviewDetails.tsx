

import Rating from "@/Components/1_atom/Rating";

export default function ReviewDetails({ 
    readonly, 
    ratings = {}
}){
    return(
        <div className="flex flex-col w-full">
            <div className="w-full mb-2 font-semibold border-b-2">
                Détails:
            </div>
            <div className="flex flex-row justify-between">
                <span>Prix:</span>
                { readonly && ratings ? ( 
                    <Rating 
                        readonly
                        value = {ratings.detailedAvg.avg_price_rating}
                    /> ): ( 
                        <Rating />
                    )
                }
            </div>
            <div className="flex flex-row justify-between">
                <span>Proffessionalisme:</span>
                { readonly && ratings ? ( 
                    <Rating 
                        readonly
                        value = {ratings.detailedAvg.avg_professionalism_rating}
                    /> ): ( 
                        <Rating />
                    )
                }
            </div>
            <div className="flex flex-row justify-between">
                <span>Propriété:</span>
                { readonly && ratings ? ( 
                    <Rating 
                        readonly
                        value = {ratings.detailedAvg.avg_cleanliness_rating}
                    /> ): ( 
                        <Rating />
                    )
                }
            </div>
            <div className="flex flex-row justify-between">
                <span>Aimabilité:</span>
                { readonly && ratings ? ( 
                    <Rating 
                        readonly
                        value = {ratings.detailedAvg.avg_kindness_rating}
                    /> ): ( 
                        <Rating />
                    )
                }
            </div>
            <div className="flex flex-row justify-between">
                <span>Qualité de la préstation:</span>
                { readonly && ratings ? ( 
                    <Rating 
                        readonly
                        value = {ratings.detailedAvg.avg_quality_rating}
                    /> ): ( 
                        <Rating />
                    )
                }
            </div>
        </div>
    )
}