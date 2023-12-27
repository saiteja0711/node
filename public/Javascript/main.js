// Function to display pros and cons based on search
async function searchReviews() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
     console.log(searchTerm);
    const resultsDiv = document.getElementById('searchResults');
    let sum = 0;
    let num = 0;
    let rate = 0;
  
    try {
      const response = await axios.get('http://localhost:3000/details'); // Assuming this endpoint returns review details
      const reviews = response.data;
      console.log(response);
      const reviewBlock = document.createElement('div');
      reviewBlock.classList.add('review-post');
  
      const Name = document.createElement('h3');
       Name.textContent = `Company Name: ${searchTerm}`;
  
       const prosConsReview = document.createElement('div');
       prosConsReview.classList.add('prosConsReview-post');
  
      reviews.forEach(review => {
        
        if (searchTerm === review.companyName.toLowerCase()) {
          sum += review.rating;
          num++;
          
          const pros = document.createElement('p');
          pros.textContent = `Pros: ${review.pros}`;
  
          const cons = document.createElement('p');
          cons.textContent = `Cons: ${review.cons}`;
  
          prosConsReview.appendChild(pros);
          prosConsReview.appendChild(cons);
        }
    });
        rate = num === 0 ? 0 : sum / num;
        const Rating = document.createElement('h3');
        Rating.textContent = `Average Rating: ${rate.toFixed(2)}`;
  
        reviewBlock.appendChild(Name);
        reviewBlock.appendChild(Rating);
        reviewBlock.appendChild(prosConsReview);
  
        resultsDiv.appendChild(reviewBlock);
      
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }
  