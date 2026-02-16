import {ReviewBaseStructure} from "../../types/review";

export const validateReviewData = (requestData: ReviewBaseStructure) => {

    if (!requestData) {
        return false;
    }

    const checks = [
        validateReviewCategory(requestData.tag),
        validateReviewRating(requestData.rating),
        validateReviewDescription(requestData.description),
    ].flat();

    return checks.every(Boolean);
};


function validateReviewCategory(category: string): boolean {
    const allowed = [
        'key',
        'chatGPT',
        'ps-plus',
        'ps-store',
        'spotify',
        'steam',
        'xbox',
    ];

    if (!category) {
        return false;
    }

    const validateResult =  allowed.includes(category);

    if (!validateResult) {
        return false;
    }

    return true;
}

function validateReviewRating(rating: number | undefined): boolean {
    if (rating === undefined) {
        return false;
    }

    if (rating <= 0 || rating > 5){
        return false;
    }

    return true
}

function validateReviewDescription(description: string): boolean {
    const trimmedValue = description.trim();

    if (!trimmedValue) {
        return false;
    }

    if (trimmedValue.length < 10) {
        return false;
    }

    if (trimmedValue.length > 1000) {
        return false;
    }

    return true
}
