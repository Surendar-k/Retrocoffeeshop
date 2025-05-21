import { useEffect, useState } from "react";
import Reviewscard from "../layouts/Reviewscard";
import { db } from './Login/firebase'; // Import the Firestore instance
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth';
import defaultImage from '../assets/images/defaultavatar.png';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ 
        title: '', 
        review: '', 
        rating: 0, 
        img: '' 
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const auth = getAuth();
    
    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        setLoading(true);
        setError(null);
        try {
            const reviewsQuery = query(collection(db, 'reviews'), orderBy('timestamp', 'desc'));
            const querySnapshot = await getDocs(reviewsQuery);
            const reviewsData = querySnapshot.docs.map(doc => ({ 
                id: doc.id, 
                ...doc.data(),
                // Ensure timestamp is serializable if it exists
                timestamp: doc.data().timestamp ? doc.data().timestamp.toDate() : new Date()
            }));
            
            setReviews(reviewsData);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setError('Error fetching reviews: ' + error.message);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!auth.currentUser) {
            setError('You must be logged in to delete a review');
            return;
        }
        
        try {
            await deleteDoc(doc(db, 'reviews', id));
            setReviews(reviews.filter(review => review.id !== id));
        } catch (error) {
            console.error('Error deleting review:', error);
            setError('Error deleting review: ' + error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview(prev => ({ 
            ...prev, 
            [name]: name === 'rating' ? Number(value) : value 
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitSuccess(false);
        
        // Check if user is logged in
        if (!auth.currentUser) {
            setError('You must be logged in to submit a review');
            return;
        }
        
        // Validate form
        if (!newReview.title || !newReview.title.trim()) {
            setError('Please enter your name');
            return;
        }
        
        if (!newReview.review || !newReview.review.trim()) {
            setError('Please enter your review');
            return;
        }
        
        if (newReview.rating < 0 || newReview.rating > 5) {
            setError('Rating must be between 0 and 5');
            return;
        }
        
        setLoading(true);
        try {
            // Create review object with user ID for permission checking
            const reviewToSubmit = {
                title: newReview.title.trim(),
                review: newReview.review.trim(),
                rating: Number(newReview.rating),
                timestamp: serverTimestamp(),
                userId: auth.currentUser.uid,  // Store user ID for permission checking
                userEmail: auth.currentUser.email // Optional: store email for display
            };
            
            // Only add img if it's not empty
            if (newReview.img && newReview.img.trim() !== '') {
                reviewToSubmit.img = newReview.img.trim();
            }
            
            // Add to Firestore
            const docRef = await addDoc(collection(db, 'reviews'), reviewToSubmit);
            
            // Add to local state with current timestamp for immediate display
            const newReviewWithId = { 
                id: docRef.id, 
                ...reviewToSubmit,
                timestamp: new Date() // Use current date for display until refresh
            };
            
            setReviews([newReviewWithId, ...reviews]);
            
            // Reset form
            setNewReview({ title: '', review: '', rating: 0, img: '' });
            setSubmitSuccess(true);
            
            // Refresh reviews from server to ensure data consistency
            fetchReviews();
            
        } catch (error) {
            console.error('Error submitting review:', error);
            setError('Error submitting review: ' + error.message);
        }
        setLoading(false);
    };
    
    // Check if user can delete a review (either admin or owner)
    const canDeleteReview = (review) => {
        if (!auth.currentUser) return false;
        
        // If the user is the one who created the review
        if (review.userId === auth.currentUser.uid) return true;
        
        // We would need to check if user is admin here
        // This implementation depends on how you store admin status
        // For simplicity, let's just return ownership check
        return review.userId === auth.currentUser.uid;
    };
    
    return (
        <div className='min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-backgroundColor'>
            <h1 className="font-semibold text-center text-4xl lg:mt-14 mt-24">{"Customer's Reviews"}</h1>
            
            {loading && <p className="text-center my-4">Loading...</p>}
            {error && <p className="text-center text-red-500 my-4">{error}</p>}
            {submitSuccess && <p className="text-center text-green-500 my-4">Review submitted successfully!</p>}
            
            {!auth.currentUser && 
                <p className="text-center my-4 text-amber-600">
                    You need to be logged in to submit or delete reviews.
                </p>
            }
            
            <div className="flex flex-row gap-5 justify-start py-10 my-8 max-h-96 overflow-x-auto">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <Reviewscard 
                            key={review.id}
                            id={review.id}
                            img={review.img || defaultImage}
                            title={review.title}
                            review={review.review}
                            rating={review.rating}
                            onDelete={canDeleteReview(review) ? () => handleDelete(review.id) : null}
                        />
                    ))
                ) : (
                    <p className="text-gray-500">No reviews yet. Be the first to add one!</p>
                )}
            </div>
            
            <div className="flex flex-col items-center mb-10">
                <h2 className="font-semibold text-2xl mt-10">Submit Your Review</h2>
                {auth.currentUser ? (
                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 mt-5 w-full lg:w-1/2">
                        <input 
                            type="text" 
                            name="title" 
                            value={newReview.title} 
                            onChange={handleInputChange} 
                            placeholder="Your Name" 
                            className="p-2 border rounded"
                            required
                        />
                        <textarea 
                            name="review" 
                            value={newReview.review} 
                            onChange={handleInputChange} 
                            placeholder="Your Review" 
                            className="p-2 border rounded"
                            required
                            rows="4"
                        />
                        <div className="flex flex-col">
                            <label htmlFor="rating" className="mb-1">Rating (0-5)</label>
                            <input 
                                type="number" 
                                id="rating"
                                name="rating" 
                                value={newReview.rating} 
                                onChange={handleInputChange} 
                                className="p-2 border rounded"
                                min="0"
                                max="5"
                                step="0.1"
                                required
                            />
                        </div>
                        <input 
                            type="text" 
                            name="img" 
                            value={newReview.img} 
                            onChange={handleInputChange} 
                            placeholder="Image URL (optional)" 
                            className="p-2 border rounded"
                        />
                        <button 
                            type="submit" 
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </form>
                ) : (
                    <div className="mt-5 p-4 bg-gray-100 rounded text-center">
                        <p>Please log in to submit a review</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reviews;