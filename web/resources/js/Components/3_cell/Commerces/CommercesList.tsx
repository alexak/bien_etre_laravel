
import CommerceList from "@/Components/2_molecule/commerces/CommerceList";


export default function CommercesList({
    commercesProps,
    routesProps,
    mapconfigProps
}) {
    return (
        <div className='h-screen overflow-y-auto'>
            <h1 className="p-2 m-2 text-xl uppercase font-bolder">
                Vos commerces proche de vous:
            </h1>
            <div className="flex flex-row w-full overflow-x-auto overflow-y-hidden md:overflow-x-hidden md:overflow-y-auto md:flex-col">
                {commercesProps.data.commerces.map((commerce) => (
                    <CommerceList 
                        key={commerce.id} 
                        commerce={commerce}
                        routesProps={routesProps}
                        mapconfigProps={mapconfigProps}
                    />
                ))}
            </div>
        </div>
    );
}