

import Rating from "@/Components/1_atom/Rating";

export default function ReviewDetails({ 
    readonly, 
    ratings = {},
    setData = () => {}
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
                        <Rating 
                            setData={(value) => setData(value) }
                            name='avgPriceRating'
                        />
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
                        <Rating 
                            setData={(value)=>setData(value)}
                            name='avgProfessionalismRating'
                        />
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
                        <Rating 
                            setData={(value)=>setData(value)}
                            name='avgCleanlinessRating'
                        />
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
                        <Rating 
                            setData={(value)=>setData(value)}
                            name='avgKindnessRating'
                        />
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
                        <Rating 
                            setData={(value)=>setData(value)}
                            name='avgQualityRating'
                        />
                    )
                }
            </div>
        </div>
    )
}