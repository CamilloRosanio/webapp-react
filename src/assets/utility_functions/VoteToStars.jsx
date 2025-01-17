// UTILITY FUNCTION - VOTE TO STARS
function voteToStars(vote) {

    if (!vote || vote == null || vote == 0 || vote === undefined) {
        return '0 votes';
    }

    if (Math.round(vote) < 1) {
        return '☆☆☆☆☆';
    } else if (Math.round(vote) > 1 && Math.round(vote) < 1.6) {
        return '★☆☆☆☆';
    } else if (Math.round(vote) >= 1.6 && Math.round(vote) < 2.6) {
        return '★★☆☆☆';
    } else if (Math.round(vote) >= 2.6 && Math.round(vote) < 3.6) {
        return '★★★☆☆';
    } else if (Math.round(vote) >= 3.6 && Math.round(vote) < 4.6) {
        return '★★★★☆';
    } else if (Math.round(vote) >= 4.6) {
        return '★★★★★';
    };
}

// FUNCTIONS EXPORT
export { voteToStars };


