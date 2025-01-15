// UTILITY
import { useState } from 'react';


// COMPONENT EXPORT

export default function ReviewsForm({ movie_id, hideForm, hideReviewForm }) {

    // FORM FIELDS
    const [formValues, setFormValues] = useState({
        movie_id: '',
        name: '',
        vote: '',
        text: '',
        created_at: '',
        updated_at: '',
    })

    // DATE AND TIME FORMATTING
    function formatDateTime() {

        // DATE
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        // TIME
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    // HANDLER VALUES CHANGES
    const handleValuesChange = (e) => {

        // TEXT VS CHECKBOX VALIDATION
        const receivedValue = (e.target.type === 'checkbox' ? e.target.checked : e.target.value);

        // SET VALUES
        setFormValues({
            ...formValues,

            // SINGLE VALUE UPDATE
            [e.target.name]: receivedValue,
        });
    }

    // HALDER FORM SUBMIT
    const handleSubmit = (e) => {

        // PREVENT DEFAULT PAGE RELOAD
        e.preventDefault();

        // SET VALUES
        const newReview = {
            movie_id: movie_id,
            name: formValues.name,
            vote: formValues.vote,
            text: formValues.text,
            created_at: formatDateTime(),
            updated_at: formatDateTime(),
        }

        // STORE REVIEW
        // AJAX REQUEST - STORE
        const ajaxStore = () => {
            alert('Store review');
        };

        alert('Name: ' + newReview.name + ' // Vote: ' + newReview.vote + ' // Text: ' + newReview.text + ' // Created: ' + newReview.created_at + ' // pdated: ' + newReview.updated_at);

        // RESET VALUES
        setFormValues({
            movie_id: '',
            name: '',
            vote: '',
            text: '',
            created_at: '',
            updated_at: '',
        });
    }


    return <>
        <form id='reviewForm' onSubmit={handleSubmit}>
            <div className={hideForm ? 'hidden' : 'reviewFormContainer'}>

                {/* FORM TITLE */}
                <h2>Leave a Review</h2>

                {/* INPUTS */}
                <div className='reviewFormInputsContainer'>

                    {/* NAME */}
                    <input type='text' name='name' value={formValues.name} placeholder='Your name' onChange={handleValuesChange} className='input' required />

                    {/* VOTE */}
                    <select name='vote' value={formValues.vote} onChange={handleValuesChange} className='input' required >
                        <option value=''>Vote</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </select>

                    {/* TEXT */}
                    <input type='text' name='text' value={formValues.text} placeholder='Write here' onChange={handleValuesChange} className='input' required />
                </div>

                {/* FORM BUTTONS */}
                <div className='reviewFormButtonsContainer'>
                    <button className='button'>Publish review</button>
                    <button type='button' className='button secondary' onClick={hideReviewForm}>Close</button>
                </div>
            </div>
        </form>
    </>
}