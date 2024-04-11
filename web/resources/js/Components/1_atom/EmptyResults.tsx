

export default function EmptyResults({parentZoomOut}){
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen p-10 text-gray-500">
            <img
                className="pb-8" 
                src="/images/icons/animated/info.gif" 
                alt="" 
                width="100" 
                height="100"
            />
            <div className="text-3xl font-bold text-pink-500">Hoppla..</div>
            <div>Malheureusement il n'y a pas de commerces par ici.. </div>
            <div
                onClick={parentZoomOut} 
                className="pb-8 underline cursor-pointer text-bolder hover:text-gray-700">
                Essayez dans un rayon plus large
            </div>
            <div> 
                Vous êtes commercant dans le domaine du bien être dans cette zone?
                <span className="pl-2 underline cursor-pointer text-bolder hover:text-gray-700">
                    Inscrivez-vous pour ajouter vôtre commerce 
                </span>
            </div>
        </div>
    );
}