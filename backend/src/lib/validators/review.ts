import {ReviewBaseStructure} from "../../types/reviewTypes";

export const validateReviewData = (requestData: ReviewBaseStructure) => {

    if (!requestData) {
        return false;
    }

    const checks = [
        validateReviewTag(requestData.tag),
        validateReviewRating(requestData.rating),
        validateReviewDescription(requestData.description),
    ].flat();

    return checks.every(Boolean);
};

function validateReviewTag(tag: string): boolean {

    return true
}

function validateReviewRating(rating: number): boolean {

    return true
}

function validateReviewDescription(description: string): boolean {

    return true
}
