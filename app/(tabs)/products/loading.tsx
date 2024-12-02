export default function Loading(){
    return(
        <>
        <div className="p-5 animate-pulse flex flex-col gap-5">
        {[...Array(10)].map((i,idx) => (
            <div key={idx} className="*:rounded-md flex-gap-5 animate-pulse" >
            <div className="bg-neutral-700 size-28 rounded-md"/>
            <div className="flex flex-col gap-2 *:h-5 *:bg-neutral-700 *:rounded-md">
            <div className="w-40"/>
            <div className="w-20"/>
            <div className="w-10"/>                
            </div>
        </div>
        ))}
        </div>
        </>
    )
}