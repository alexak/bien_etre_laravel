

export default function EmptyResults(){
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen p-10">
            <img
                className="pb-8" 
                src="/images/icons/animated/info.gif" 
                alt="" 
                width="100" 
                height="100"
            />
            <div className="text-3xl font-bold text-pink-500">Hoppla..</div>
            <div>Malheureusement il n'y a pas de commerces</div>
            <div>Essayez dans un rayon plus large</div>
        </div>
    );
}