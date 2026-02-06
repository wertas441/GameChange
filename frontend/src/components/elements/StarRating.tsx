import {Star} from "lucide-react";

export default function StarRating ({rating}: { rating: number }) {

    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
                <Star
                    key={index}
                    className={`h-5 w-5 ${index < rating ? 'text-green-400' : 'text-gray-600'}`}
                />
            ))}
        </div>
    );
};