import RatingProgressLine from "@/Components/1_atom/RatingProgressLine";



export default function RatingCounts({ratings}){


    return (
        <div className="flex flex-col w-full">
            <div className="w-full mb-2 font-semibold border-b-2">
                <h3>Nombre d'avis:</h3>
            </div>

            {
                [...ratings.countsByRatings].sort((a, b) => b.key - a.key).map((item, index) => (
                    item.key == 0 ? (
                        <></>
                    ) : (
                        <RatingProgressLine
                            key = {index}
                            stars = {item.key}
                            value = {item.value*100/ratings.totalCount}
                            link = {null}
                        />
                    )
                ))
            }
        </div>
    );
}