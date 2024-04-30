

import Rating from "@/Components/1_atom/Rating";

export default function ReviewDetails({ 
    readonly, 
    ratings = {},
    handleRatingChange = (name, value) => {}
}){
    return(
        <div className="flex flex-col w-full">
            <div className="w-full mb-2 font-semibold border-b-2">
                Détails:
            </div>
            <div className="flex flex-row justify-between">
                <span>Prix:</span>
                { 
                    readonly && ratings ? ( 
                        <Rating 
                            readonly
                            value = {ratings.detailedAvg.avgPriceRating}
                        /> 
                    ):( 
                        <Rating setData={(name, value) => handleRatingChange('priceRating', value)} />
                    )
                }
            </div>
            <div className="flex flex-row justify-between">
                <span>Proffessionalisme:</span>
                { 
                    readonly && ratings ? ( 
                        <Rating 
                            readonly
                            value = {ratings.detailedAvg.avgProfessionalismRating}
                        /> 
                    ): ( 
                        <Rating setData={(name, value) => handleRatingChange('professionalismRating', value)} />
                    )
                }
            </div>
            <div className="flex flex-row justify-between">
                <span>Propriété:</span>
                { 
                    readonly && ratings ? ( 
                        <Rating 
                            readonly
                            value = {ratings.detailedAvg.avgCleanlinessRating}
                        /> 
                    ): ( 
                        <Rating setData={(name, value) => handleRatingChange('cleanlinessRating', value)} />
                    )
                }
            </div>
            <div className="flex flex-row justify-between">
                <span>Aimabilité:</span>
                { 
                    readonly && ratings ? ( 
                        <Rating 
                            readonly
                            value = {ratings.detailedAvg.avgKindnessRating}
                        /> 
                    ): ( 
                        <Rating setData={(name, value) => handleRatingChange('kindnessRating', value)} />
                    )
                }
            </div>
            <div className="flex flex-row justify-between">
                <span>Qualité de la préstation:</span>
                { 
                    readonly && ratings ? ( 
                        <Rating 
                            readonly
                            value = {ratings.detailedAvg.avgQualityRating}
                        /> 
                    ): ( 
                        <Rating setData={(name, value) => handleRatingChange('qualityRating', value)} />
                    )
                }
            </div>
        </div>
    )
}
