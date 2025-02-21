const username = document.getElementById("username");
const review = document.getElementById("review");
const reviewsCollection = document.getElementById("reviews-collection");
const starRatings = document.querySelectorAll(".rating");
const submitBtn = document.getElementById("submit-btn");
const sortSelect = document.getElementById("sortReviews");

const filledStar = "../public/filledstar.png";
const emptyStar = "../public/star.png";

let allReviews = JSON.parse(localStorage.getItem("reviews")) || [];
let countRatings = 0;

function rating(event) {
    const ratingId =Number(event.target.id);
    countRatings = ratingId;

    starRatings.forEach((star, index) => {
        star.src = index < ratingId ? filledStar : emptyStar;
    });
}

starRatings.forEach(star => star.addEventListener("click", rating));
function getPastelColor() {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`;
}
function renderReviews() {
    reviewsCollection.innerHTML = "";
    if (allReviews.length === 0) {
        reviewsCollection.innerHTML = `<p class="text-gray-300 text-center">No Reviews Yet</p>`;
        return;
    }

    let sortedReviews = [...allReviews];

    if (sortSelect.value === "latest") {
        sortedReviews.sort((a, b) => b.timestamp - a.timestamp);
    } else if (sortSelect.value === "oldest") {
        sortedReviews.sort((a, b) => a.timestamp - b.timestamp);
    }

    sortedReviews.forEach((review) => {
        let userReview = document.createElement("div");
        userReview.classList.add("bg-gray-200", "p-5", "rounded-lg", "shadow-lg", "mb-7","mr-10");
        let mainDiv = document.createElement("div");
        let userDiv = document.createElement("div");
        userDiv.classList.add("flex","flex-direction:col","space-x-3");
        mainDiv.classList.add("flex","justify-between");
        let usernameDiv = document.createElement("div");
        let defaultProfilePic = document.createElement("div");
        defaultProfilePic.innerText = review.username[0].toUpperCase();
        defaultProfilePic.style.backgroundColor = getPastelColor();
        defaultProfilePic.style.fontWeight = "bold"
       
        defaultProfilePic.style.borderRadius = "25px"
        defaultProfilePic.style.height= "40px"
        defaultProfilePic.style.width= "40px"
        defaultProfilePic.style.display = "flex"
        defaultProfilePic.style.justifyContent = "center"
        defaultProfilePic.style.alignItems = "center"
        console.log(defaultProfilePic)
      
        console.log(usernameDiv)
        
        usernameDiv.innerText = ` ${review.username}`;
        usernameDiv.classList.add("font-semibold","mt-1","text-lg");

        let reviewDiv = document.createElement("div");
       
        reviewDiv.classList.add("ml-11", "-mt-4", "w-[90%]", "h-auto", "break-words", "p-2", "rounded-lg");

        reviewDiv.innerText = review.review;

        let ratingDiv = document.createElement("div");
        for (let i = 0; i < 5; i++) {
            let star = document.createElement("img");
            star.src = i < review.ratings ? filledStar : emptyStar;
            star.classList.add("w-6", "h-6", "inline");
            ratingDiv.appendChild(star);
        }

        let timeDiv = document.createElement("div");
        timeDiv.innerText = new Date(review.timestamp).toLocaleString();
        timeDiv.classList.add("text-gray-500", "text-sm","flex","justify-end");
        userDiv.appendChild(defaultProfilePic);
        userDiv.appendChild(usernameDiv);
        mainDiv.appendChild(userDiv)
        mainDiv.appendChild(ratingDiv);
        userReview.appendChild(mainDiv)
        userReview.appendChild(reviewDiv);
        userReview.appendChild(timeDiv);

        reviewsCollection.appendChild(userReview);
    });
}

submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (!username.value.trim() || !review.value.trim() || countRatings === 0) {
        alert("Please fill out all fields and give a rating.");
        return;
    }

    allReviews.push({
        username: username.value.trim(),
        review: review.value.trim(),
        ratings: countRatings,
        timestamp: Date.now()
    });

    localStorage.setItem("reviews", JSON.stringify(allReviews));

    username.value = "";
    review.value = "";
    countRatings = 0;

    starRatings.forEach(star => star.src = emptyStar);

    renderReviews();
});

window.addEventListener("load", renderReviews);
sortSelect.addEventListener("change", renderReviews);

window.onload = function() {
    document.getElementById("review").value = "";
};
