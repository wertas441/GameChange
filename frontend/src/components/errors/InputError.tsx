
export default function InputError({error}:{error: string | undefined}){

    return (
        <div className="error">
            {error && (
                <p className="text-xs ml-2  text-red-400">{error}</p>
            )}
        </div>
    )
}

